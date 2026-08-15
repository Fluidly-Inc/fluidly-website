import { Reveal } from "../ui";
import styles from "./sections.module.css";

export function Equation() {
  return (
    <section className={`section ${styles.equationSection}`} id="problem">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">The idea</div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className={styles.equation}>
            <span className={styles.eqTerm}>Work</span>
            <span className={styles.eqOp}>=</span>
            <span className={styles.eqTerm}>Decisions</span>
            <span className={styles.eqOp}>+</span>
            <span className={styles.eqTerm}>Policy</span>
            <span className={styles.eqOp}>+</span>
            <span className={styles.eqTerm}>Outcomes</span>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="lede">
            CRMs store customers. ERPs store transactions. EHRs store records. None of them
            understand how work actually moves. Fluidly separates process logic from application
            interfaces, so work becomes a shared model instead of a rumor spread across inboxes and
            spreadsheets.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
