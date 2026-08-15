"use client";

import { useState } from "react";
import { Button, Reveal } from "../ui";
import styles from "./contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Try again.");
      setStatus("error");
    }
  }

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="wrap">
        <Reveal>
          <div className={styles.shell}>
            <div className={styles.pitch}>
              <div className="eyebrow">Build the operating system for your work</div>
              <h2 className="h-lg">
                Start with one high-value process. Expand into a living enterprise model.
              </h2>
              <p className="lede">
                Pick the process that costs you the most in delays and rework. We will make it
                visible, then work outward from there.
              </p>
              <div className={styles.altContact}>
                Prefer email?{" "}
                <a href="mailto:contact@fluidly.ai?subject=Fluidly%20demo%20request">contact@fluidly.ai</a>
              </div>
            </div>

            {status === "sent" ? (
              <div className={styles.success} role="status">
                <div className={styles.checkmark}>✓</div>
                <h3>Request received.</h3>
                <p>We will be in touch shortly to set up your demo.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                {/* honeypot: visually hidden, off-screen, ignored by real users */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className={styles.honeypot}
                  aria-hidden
                />

                <div className={styles.row}>
                  <label>
                    Name
                    <input name="name" type="text" required maxLength={120} placeholder="Your name" />
                  </label>
                  <label>
                    Work email
                    <input name="email" type="email" required maxLength={160} placeholder="you@company.com" />
                  </label>
                </div>
                <label>
                  Company
                  <input name="company" type="text" maxLength={160} placeholder="Organization" />
                </label>
                <label>
                  What process would you start with?
                  <textarea name="message" rows={3} maxLength={2000} placeholder="Tell us about the work you want to make visible." />
                </label>

                {status === "error" && <p className={styles.errorMsg}>{error}</p>}

                <Button type="submit" full disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Request a demo"}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
