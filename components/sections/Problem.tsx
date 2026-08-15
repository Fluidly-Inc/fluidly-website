import { Reveal } from "../ui";
import styles from "./sections.module.css";

const SOURCES = ["Inbox", "Spreadsheet", "CRM", "Slack", "ERP", "EHR", "AI Agent"];

export function Problem() {
  return (
    <section className={`section ${styles.problem}`} id="problem">
      <div className="wrap">
        <div className={styles.problemHead}>
          <Reveal>
            <div className="eyebrow">The invisible enterprise</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-xl">
              Organizations do not have a software problem.
              <br />
              <span className="gradient-text">They have a process intelligence problem.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Work fragments across systems, people, policies, agents, documents, and decisions.
              Each tool sees a piece. No one sees the whole.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className={styles.convergence} aria-label="Fragmented systems converging into one model of work">
            <div className={styles.sources}>
              {SOURCES.map((s) => (
                <span key={s} className={styles.source}>
                  {s}
                </span>
              ))}
            </div>

            <div className={styles.core}>
              <span className={styles.ring} />
              <span className={`${styles.ring} ${styles.ring2}`} />
              <div className={styles.coreOrb}>Work</div>
            </div>

            <div className={styles.result}>
              <small>What the organization needs</small>
              <strong>One shared model of work in motion.</strong>
              <p>Visible state. Explicit decisions. Executable policy. Traceable outcomes.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
