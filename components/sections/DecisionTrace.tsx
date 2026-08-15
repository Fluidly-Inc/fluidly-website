import { Reveal, Tag } from "../ui";
import styles from "./sections.module.css";

const ITEMS = [
  {
    time: "09:41:12 · Event",
    title: "Refill request received",
    body: "Patient submitted a request through the portal.",
  },
  {
    time: "09:41:13 · Context",
    title: "Clinical state resolved",
    body: "Medication history, latest labs, provider relationship, and safety policy loaded.",
  },
  {
    time: "09:41:14 · Decision",
    title: "Provider review required",
    body: "The renal function test is outside the configured renewal window. Confidence: 94%.",
    tags: ["Policy RX-14", "5 artifacts", "Refill Agent"],
    featured: true,
  },
  {
    time: "10:06:42 · Outcome",
    title: "Renewal completed safely",
    body: "Provider approved the refill and a future lab Work Item was created.",
  },
];

export function DecisionTrace() {
  return (
    <section className={`section ${styles.traceSection}`}>
      <div className="wrap">
        <div className={styles.centerHead}>
          <Reveal>
            <div className="eyebrow">Git history for work</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-lg">Every decision leaves a trace.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede" style={{ margin: "0 auto" }}>
              A decision trace is the immutable, timestamped record Fluidly writes for every
              consequential decision: the event that triggered it, the context and evidence
              considered, the policy applied, the confidence score, and the resulting outcome,
              linked together in one continuous, auditable sequence.
            </p>
          </Reveal>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} as="article">
              <div className={`${styles.timelineItem} ${item.featured ? styles.timelineFeatured : ""}`}>
                <span className={styles.timelineDot} />
                <small>{item.time}</small>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.tags && (
                  <div className={styles.timelineTags}>
                    {item.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
