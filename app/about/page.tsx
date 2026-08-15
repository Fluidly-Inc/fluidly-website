import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal, Button } from "@/components/ui";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fluidly builds the operating system for how work moves. We started in healthcare medication-refill operations, where work is fragmented, regulated, and high stakes.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "Model work, not just data",
    body: "Systems store records. They do not understand how work moves between people, policies, and decisions. We model the movement itself.",
  },
  {
    title: "Every decision leaves a trace",
    body: "Context, evidence, policy, confidence, actor, and outcome are captured together. Nothing consequential happens without a reason you can read back.",
  },
  {
    title: "Automation stays inside policy",
    body: "Agents observe, recommend, and act within explicit guardrails, with a human in the loop wherever the stakes call for one.",
  },
  {
    title: "Start narrow, expand outward",
    body: "One high-value process first. The shared model grows from there into a living map of how the organization actually runs.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Fluidly",
  url: "https://fluidly.ai/about",
  about: { "@type": "Organization", name: "Fluidly", "@id": "https://fluidly.ai/#organization" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className={`section ${styles.hero}`} id="top">
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">About Fluidly</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="h-xl">
                We are building the operating system for how work moves.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede">
                Every organization runs on work. It fragments across systems, people, policies,
                agents, and decisions, and no single tool sees the whole thing move. Fluidly is the
                shared model that does.
              </p>
            </Reveal>
          </div>
        </section>

        <section className={`section ${styles.story}`}>
          <div className="wrap">
            <div className={styles.storyGrid}>
              <Reveal>
                <div className="eyebrow">Why we exist</div>
                <h2 className="h-lg">Software owns interfaces. It should not own how work happens.</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className={styles.storyBody}>
                  <p>
                    CRMs store customers. ERPs store transactions. EHRs store records. Each one
                    reimplements its own process logic, and the work that crosses between them stays
                    invisible. That gap is where delays, rework, and risk live.
                  </p>
                  <p>
                    Fluidly separates process logic from application interfaces. It is a shared
                    execution and intelligence layer beneath the apps a team already runs, grounded
                    in a small set of durable primitives: Actor, Work Item, Artifact, Event, Context,
                    Policy, Decision, Action, and Outcome. Model those, and work becomes visible,
                    explainable, executable, and improvable.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={`section ${styles.principles}`}>
          <div className="wrap">
            <div className={styles.centerHead}>
              <Reveal>
                <div className="eyebrow">How we build</div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h-lg">A few things we hold to.</h2>
              </Reveal>
            </div>
            <div className={styles.grid}>
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={(i % 2) * 0.08} as="article">
                  <div className={`card ${styles.principleCard}`}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.wedge}`}>
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">Where we started</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-lg">Healthcare, where work is fragmented and the stakes are real.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede">
                Our first production use case is US outpatient medication-refill operations. A
                patient request becomes a Work Item, gets evaluated against clinical context and
                safety policy, produces an AI-assisted decision with a confidence score, triggers an
                action, and logs an auditable outcome. If it holds up here, it holds up anywhere work
                is regulated and coordination is hard.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={styles.cta}>
                <Button href="/#contact">Request a demo</Button>
                <Button href="/blog" variant="ghost">
                  Read the blog
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
    </>
  );
}
