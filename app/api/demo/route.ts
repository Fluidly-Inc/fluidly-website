import { NextResponse } from "next/server";
import { Resend } from "resend";
import { log } from "@/lib/logger";

/* Demo-request intake. Trust boundary: validate everything server-side.
   Sends via Resend. To swap to Azure Communication Services (all-Azure
   shops), replace the send block with an ACS EmailClient.send() call;
   the validation above stays identical. */

const MAX = { name: 120, email: 160, company: 160, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ponytail: in-memory sliding window, resets on redeploy/cold start and
// isn't shared across serverless instances. It's bot friction, not a hard
// cap. Swap for Upstash/KV rate limiting if abuse volume ever justifies it.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function stripNewlines(s: string): string {
  return s.replace(/[\r\n]+/g, " ");
}

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string; // honeypot: real users never fill this
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot filled -> silently accept without sending (drop the bot)
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = stripNewlines((body.name ?? "").trim());
  const email = stripNewlines((body.email ?? "").trim());
  const company = stripNewlines((body.company ?? "").trim());
  const message = (body.message ?? "").trim();

  // 4 hand-rolled checks, no schema lib needed for 4 fields
  if (!name || name.length > MAX.name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email) || email.length > MAX.email) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (company.length > MAX.company || message.length > MAX.message) {
    return NextResponse.json({ error: "That input is too long." }, { status: 400 });
  }

  const to = process.env.DEMO_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) {
    // Not configured yet: accept the lead so the UI works, log for follow-up.
    // ponytail: swap this whole route for a Formspree endpoint if standing up
    // email infra is undesirable.
    log.warn("demo: email not configured, lead logged not sent", { name, email, company });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Fluidly Site <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Demo request from ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\n\n${message || "(no message)"}`,
    });
    log.info("demo: lead emailed", { email, company });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    log.error("demo: send failed", err);
    return NextResponse.json({ error: "Could not send right now. Try again." }, { status: 502 });
  }
}
