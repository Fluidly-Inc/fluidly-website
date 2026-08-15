import { Reveal } from "../ui";
import styles from "./sections.module.css";

export const FAQS = [
  {
    q: "What is a Process Intelligence Operating System?",
    a: "A Process Intelligence Operating System is a software layer that models organizational work itself, not just the data about work, as a set of primitives: Actor, WorkItem, Artifact, Event, ContextSnapshot, Policy, Decision, Action, and Outcome. It sits beneath the applications an organization already runs and makes work visible, explainable, executable, and continuously improvable.",
  },
  {
    q: "How is Fluidly different from a CRM or ERP?",
    a: "A CRM stores customer records and an ERP stores transactions, but neither understands how work actually moves between people, policies, and systems. Fluidly is not another application competing with your CRM or ERP. It is an operating system layer underneath them, so every app can share one live model of work instead of each one reimplementing its own process logic.",
  },
  {
    q: "What is a decision trace?",
    a: "A decision trace is the immutable, timestamped record Fluidly writes for every consequential decision: the event that triggered it, the context and evidence considered, the policy applied, the confidence score, and the resulting outcome, linked together in one continuous, auditable sequence.",
  },
  {
    q: "What is Fluidly's flagship use case?",
    a: "Fluidly's first production use case is US outpatient medication-refill operations. A patient's SMS or voice request becomes a WorkItem, is evaluated against clinical context and safety policy, produces an AI-assisted decision with a confidence score, triggers an action, and logs an auditable outcome.",
  },
  {
    q: "Does a human stay in control of AI decisions?",
    a: "Yes. Agents in Fluidly observe state, query the digital twin, and recommend or make decisions inside policy guardrails, with human-in-the-loop review for consequential actions. Every agent action is logged with its rationale.",
  },
];

export function FAQ() {
  return (
    <section className={`section ${styles.faqSection}`} id="faq">
      <div className="wrap">
        <div className={styles.centerHead}>
          <Reveal>
            <div className="eyebrow">Questions</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-lg">What people ask first.</h2>
          </Reveal>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.06} as="article">
              <div className={styles.faqItem}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
