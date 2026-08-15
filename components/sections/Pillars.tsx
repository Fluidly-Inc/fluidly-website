import { Reveal } from "../ui";
import styles from "./sections.module.css";

const PILLARS = [
  {
    no: "01",
    title: "Everything is a primitive",
    body: "Actor, Work Item, Artifact, Event, Context, Policy, Decision, Action, Outcome. Nine durable primitives that every workflow, agent, and application is built from.",
  },
  {
    no: "02",
    title: "Every decision is traceable",
    body: "Each consequential decision records its context, evidence, policy, confidence, and outcome in one immutable, append-only trace. Read back exactly why anything happened.",
  },
  {
    no: "03",
    title: "Policy is executable",
    body: "Rules are not documents. They constrain what actions and transitions are allowed at runtime, and agents act only inside those guardrails.",
  },
];

export function Pillars() {
  return (
    <section className={`section ${styles.pillarsSection}`}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">How it works</div>
        </Reveal>
        <div className={styles.pillars}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.08} as="article">
              <div className={styles.pillar}>
                <span className={styles.pillarNo}>{p.no}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
