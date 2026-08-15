import { Button, Reveal } from "../ui";
import styles from "./sections.module.css";

const USE_CASES = [
  "Medication refill orchestration",
  "Referral and prior authorization",
  "Chronic care gap closure",
  "HCC recapture and revenue integrity",
];

const STAKEHOLDERS = [
  { who: "Operations", title: "See and improve work in motion.", body: "Reduce coordination, delays, rework, and operational variance." },
  { who: "Executives", title: "Connect process change to outcomes.", body: "Understand cost, risk, SLA, capacity, and customer impact." },
  { who: "Technology", title: "Build on a reusable process foundation.", body: "Stop reimplementing logic and integrations inside every app." },
  { who: "Risk & Compliance", title: "Make execution auditable by default.", body: "Trace every action back to evidence, actor, policy, and rationale." },
  { who: "Builders", title: "Compose products, not silos.", body: "Create role-specific applications over shared intelligence." },
  { who: "Customers", title: "Experience coordinated work.", body: "Get faster answers, fewer handoffs, and context-aware service." },
];

export function Healthcare() {
  return (
    <>
      <section className={`section ${styles.healthcare}`} id="healthcare">
        <div className={styles.healthcareBackdrop} aria-hidden />
        <div className="wrap">
          <div className={styles.healthcareWrap}>
            <Reveal className={styles.healthcareCopy}>
              <div className="eyebrow">Healthcare flagship</div>
              <h2 className="h-lg">Proven where work is fragmented, regulated, and high stakes.</h2>
              <p className="lede">
                Fluidly connects clinical context, administrative workflows, policies, decisions,
                and outcomes, reducing friction without sacrificing control.
              </p>
              <div className={styles.useCases}>
                {USE_CASES.map((u) => (
                  <span key={u}>{u}</span>
                ))}
              </div>
              <Button href="#contact">Explore healthcare with us</Button>
            </Reveal>

            <Reveal delay={0.1} className={styles.careFlow}>
              <article className={styles.careCard}>
                <small>Patient context</small>
                <h3>Diabetes follow-up</h3>
                <p>A1C overdue · Refill requested</p>
              </article>
              <span className={styles.careConnector} />
              <article className={`${styles.careCard} ${styles.careEmphasis}`}>
                <small>Fluidly process intelligence</small>
                <h3>One context, coordinated decisions</h3>
                <p>Policy, labs, medication, capacity, and care gaps evaluated together.</p>
              </article>
              <span className={styles.careConnector} />
              <article className={styles.careCard}>
                <small>Coordinated outcome</small>
                <h3>One interaction, three actions</h3>
                <p>Refill routed · Lab ordered · Care gap scheduled</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`section ${styles.stakeholderSection}`} id="stakeholders">
        <div className="wrap">
          <div className={styles.centerHead}>
            <Reveal>
              <div className="eyebrow">One platform. Different value.</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-lg">It clicks with every stakeholder.</h2>
            </Reveal>
          </div>
          <div className={styles.stakeholderGrid}>
            {STAKEHOLDERS.map((s, i) => (
              <Reveal key={s.who} delay={(i % 3) * 0.08} as="article">
                <div className={`card ${styles.stakeholderCard}`}>
                  <span>{s.who}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
