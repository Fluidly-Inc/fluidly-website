"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "../ui";
import styles from "./sections.module.css";

type Layer = {
  id: string;
  no: string;
  name: string;
  role: string;
  kicker: string;
  title: string;
  body: string;
  points: string[];
};

const LAYERS: Layer[] = [
  {
    id: "workflow",
    no: "01",
    name: "Workflow",
    role: "Execution contract",
    kicker: "The process kernel",
    title: "Define how work is allowed to flow.",
    body: "Model Work Items, states, transitions, actions, permissions, and decision points as an explicit execution contract.",
    points: ["Dynamic workflows", "State-aware actions", "Human and machine actors"],
  },
  {
    id: "twin",
    no: "02",
    name: "Digital Twin",
    role: "Semantic impact map",
    kicker: "The organizational digital twin",
    title: "Understand meaning, relationships, and impact.",
    body: "Connect stable business entities and process dependencies so the organization can reason across workflows.",
    points: ["Cross-process context", "Dependency mapping", "What-if simulation"],
  },
  {
    id: "decision",
    no: "03",
    name: "Decisions",
    role: "Explainability layer",
    kicker: "Decision intelligence",
    title: "Make every consequential decision explainable.",
    body: "Capture context, evidence, policy, alternatives, confidence, actor, and outcome in one immutable trace.",
    points: ["Full decision lineage", "Policy transparency", "Outcome-linked learning"],
  },
  {
    id: "agents",
    no: "04",
    name: "Agents",
    role: "Action layer",
    kicker: "Supervised autonomy",
    title: "Let agents act safely inside the process.",
    body: "Agents observe state, query the digital twin, recommend or make decisions, execute allowed actions, and log rationale.",
    points: ["AI or deterministic", "Human-in-the-loop", "Policy-governed actions"],
  },
  {
    id: "apps",
    no: "05",
    name: "Applications",
    role: "Experience layer",
    kicker: "Composable applications",
    title: "Build experiences without rebuilding the process.",
    body: "Applications become purpose-built views and behaviors layered over shared workflows, decisions, agents, and data.",
    points: ["Operator experiences", "Customer experiences", "Builder APIs"],
  },
];

export function OSLayers() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];

  return (
    <section className={`section ${styles.layersSection}`}>
      <div className="wrap">
        <div className={styles.splitHead}>
          <div>
            <Reveal>
              <div className="eyebrow">Five layers, one model</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-lg">The operating model of work.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede">
              Each layer does one job. Stacked, they turn a process you can only describe into one
              the organization can run, reason about, and improve.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className={styles.explorer}>
            <div className={styles.tabs} role="tablist" aria-label="Fluidly OS layers">
              {LAYERS.map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={styles.tab}
                  data-active={i === active}
                  onClick={() => setActive(i)}
                >
                  <span>{l.no}</span>
                  <strong>{l.name}</strong>
                  <small>{l.role}</small>
                </button>
              ))}
            </div>

            <div className={styles.stage}>
              <AnimatePresence mode="wait">
                <motion.article
                  key={layer.id}
                  className={styles.layerPanel}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className={styles.layerCopy}>
                    <small>{layer.kicker}</small>
                    <h3>{layer.title}</h3>
                    <p>{layer.body}</p>
                    <ul>
                      {layer.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                  <LayerVisual id={layer.id} />
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LayerVisual({ id }: { id: string }) {
  if (id === "workflow") {
    return (
      <div className={styles.wfDiagram}>
        <span className={styles.wfNode}>Request</span>
        <i />
        <span className={`${styles.wfNode} ${styles.wfActive}`}>Decision</span>
        <i />
        <span className={styles.wfNode}>Action</span>
      </div>
    );
  }
  if (id === "twin") {
    return (
      <div className={styles.twinGraph}>
        <svg viewBox="0 0 520 280" role="img" aria-label="Digital twin graph">
          <path d="M260 140 L110 68 M260 140 L420 72 M260 140 L96 218 M260 140 L426 220 M260 140 L260 34" />
          <circle cx="260" cy="140" r="38" className={styles.primaryNode} />
          <circle cx="110" cy="68" r="25" />
          <circle cx="420" cy="72" r="25" />
          <circle cx="96" cy="218" r="25" />
          <circle cx="426" cy="220" r="25" />
          <circle cx="260" cy="34" r="25" />
          <text x="260" y="145">Patient</text>
          <text x="110" y="72">Medication</text>
          <text x="420" y="76">Provider</text>
          <text x="96" y="222">Policy</text>
          <text x="426" y="224">Lab</text>
          <text x="260" y="38">Context</text>
        </svg>
      </div>
    );
  }
  if (id === "decision") {
    return (
      <div className={styles.decisionStack}>
        <div>
          <small>Context</small>
          <strong>Patient safety state</strong>
        </div>
        <div>
          <small>Policy</small>
          <strong>RX-14 renewal guardrail</strong>
        </div>
        <div className={styles.stackEmphasis}>
          <small>Decision</small>
          <strong>Provider review required</strong>
        </div>
        <div>
          <small>Outcome</small>
          <strong>Safe renewal completed</strong>
        </div>
      </div>
    );
  }
  if (id === "agents") {
    return (
      <div className={styles.agentStage}>
        <div className={styles.agentSphere} />
        <strong>Refill Agent</strong>
        <span>Observing 184 active Work Items</span>
        <div className={styles.agentSteps}>
          <i>Observe</i>
          <i>Decide</i>
          <i>Act</i>
          <i>Explain</i>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.appsStage}>
      {[0, 1, 2].map((k) => (
        <div key={k} className={styles.miniApp}>
          <span />
          <i />
          <i />
          <i />
        </div>
      ))}
    </div>
  );
}
