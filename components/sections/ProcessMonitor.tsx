import { MetricCounter, Reveal } from "../ui";
import styles from "./sections.module.css";

const METRICS = [
  { label: "Active work", value: 12846, suffix: "", sub: "Across 42 processes" },
  { label: "Decisions today", value: 3842, suffix: "", sub: "91% explainable" },
  { label: "At risk", value: 184, suffix: "", sub: "Requires attention" },
  { label: "Automated safely", value: 78, suffix: "%", sub: "Within policy" },
];

const STREAM = [
  { status: "healthy", title: "Medication refill", sub: "Awaiting eligibility decision", meta: "23 sec" },
  { status: "warning", title: "Referral authorization", sub: "Blocked by missing artifact", meta: "4 min" },
  { status: "healthy", title: "Lab follow-up", sub: "Agent preparing patient outreach", meta: "8 min" },
  { status: "danger", title: "Claims exception", sub: "SLA threshold exceeded", meta: "17 min" },
];

export function ProcessMonitor() {
  return (
    <section className={`section ${styles.monitorSection}`} id="os">
      <div className="wrap">
        <div className={styles.splitHead}>
          <div>
            <Reveal>
              <div className="eyebrow">A living system</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-lg">
                Imagine Activity Monitor.
                <br />
                For your entire organization.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede">
              Every Work Item is alive. Every decision has a reason. Every policy can execute. Every
              outcome becomes institutional memory.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className={styles.monitor}>
            <div className={styles.monitorBar}>
              <div className={styles.monitorBarLeft}>
                <span className={styles.monitorMark} />
                <strong>Fluidly Process Monitor</strong>
              </div>
              <div className={styles.monitorStatus}>
                <span /> Live organizational state
              </div>
            </div>

            <div className={styles.monitorBody}>
              <div className={styles.metrics}>
                {METRICS.map((m) => (
                  <article key={m.label} className={styles.metric}>
                    <span>{m.label}</span>
                    <strong>
                      <MetricCounter value={m.value} suffix={m.suffix} />
                    </strong>
                    <small>{m.sub}</small>
                  </article>
                ))}
              </div>

              <div className={styles.monitorGrid}>
                <div className={styles.stream}>
                  <div className={styles.panelLabel}>Live work stream</div>
                  {STREAM.map((row) => (
                    <div key={row.title} className={styles.streamRow}>
                      <span className={`${styles.dot} ${styles[row.status]}`} />
                      <div>
                        <strong>{row.title}</strong>
                        <small>{row.sub}</small>
                      </div>
                      <span className={styles.streamMeta}>{row.meta}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.decisionPanel}>
                  <div className={styles.panelLabel}>Decision trace</div>
                  <div className={styles.traceOrb} />
                  <h4>Route to provider review</h4>
                  <p>
                    Recommended because the last renal function test is older than the configured
                    safety threshold.
                  </p>
                  <div className={styles.traceConfidence}>
                    <span>Confidence</span>
                    <strong>94%</strong>
                  </div>
                  <div className={styles.traceBar}>
                    <span />
                  </div>
                  <div className={styles.traceTags}>
                    <span>3 policies</span>
                    <span>5 artifacts</span>
                    <span>1 agent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
