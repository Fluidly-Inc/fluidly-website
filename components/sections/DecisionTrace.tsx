import { Reveal } from "../ui";
import styles from "./sections.module.css";

export function DecisionTrace() {
  return (
    <section className={`section ${styles.traceSection}`}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">Git history for work</div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="h-lg">Every decision leaves a trace.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede">
            Human actions, AI recommendations, policy checks, evidence, and outcomes become one
            continuous, append-only explanation. Read back exactly why the system did what it did.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <pre className={`codeblock ${styles.trace}`}>
            <code>
              <span className={styles.tDim}>09:41:12</span>{"  "}
              <span className={styles.tAccent}>EVENT</span>{"     "}refill request received
              {"\n"}
              <span className={styles.tDim}>09:41:13</span>{"  "}
              <span className={styles.tAccent}>CONTEXT</span>{"   "}labs, meds, provider, safety policy loaded
              {"\n"}
              <span className={styles.tDim}>09:41:14</span>{"  "}
              <span className={styles.tAccent}>DECISION</span>{"  "}route to provider review
              {"\n"}
              {"                    "}└ policy RX-14 · confidence 94% · 5 artifacts
              {"\n"}
              <span className={styles.tDim}>10:06:42</span>{"  "}
              <span className={styles.tAccent}>OUTCOME</span>{"   "}renewal completed safely
            </code>
          </pre>
        </Reveal>
      </div>
    </section>
  );
}
