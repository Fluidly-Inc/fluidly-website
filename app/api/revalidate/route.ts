import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { log } from "@/lib/logger";

/* Sanity publish webhook -> on-demand revalidation. Trust boundary:
   verify the signature against SANITY_REVALIDATE_SECRET before revalidating.
   Configure in Sanity manage: GROQ webhook with
   projection { "tags": [_type, _type + ":" + slug.current] }
   filter _type in ["post","author"], secret = SANITY_REVALIDATE_SECRET. */

type WebhookPayload = { tags?: string[] };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true // delay so the CDN reflects the change before we revalidate
    );

    if (!isValidSignature) {
      log.warn("revalidate: invalid webhook signature rejected");
      return new Response("Invalid signature", { status: 401 });
    }
    if (!Array.isArray(body?.tags) || body.tags.length === 0) {
      log.warn("revalidate: webhook missing tags", body);
      return new Response("Missing tags", { status: 400 });
    }

    // Next 16 requires a cache profile arg; "max" invalidates the tag broadly.
    body.tags.forEach((tag) => revalidateTag(tag, "max"));
    log.info("revalidate: tags refreshed", body.tags);
    return NextResponse.json({ revalidated: body.tags });
  } catch (err) {
    log.error("revalidate: failed", err);
    return new Response((err as Error).message, { status: 500 });
  }
}
