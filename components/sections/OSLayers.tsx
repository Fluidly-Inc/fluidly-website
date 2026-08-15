"use client";

import { useState } from "react";
import { Reveal } from "../ui";
import styles from "./sections.module.css";

const LAYERS = [
  {
    id: "workflow",
    name: "Workflow",
    role: "Execution contract",
    body: "Model Work Items, states, transitions, actions, and permissions as an explicit execution contract. Human and machine actors, one set of rules.",
    points: ["Dynamic workflows", "State-aware actions", "Human + machine actors"],
  },
  {
    id: "twin",
    name: "Digital Twin",
    role: "Semantic map",
    body: "Connect stable business entities and process dependencies so the organization can reason across workflows, not just within one.",
    points: ["Cross-process context", "Dependency mapping", "What-if simulation"],
  },
  {
    id: "decisions",
    name: "Decisions",
    role: "Explainability",
    body: "Capture context, evidence, policy, alternatives, confidence, actor, and outcome in one immutable trace for every consequential decision.",
    points: ["Full lineage", "Policy transparency", "Outcome-linked learning"],
  },
  {
    id: "agents",
    name: "Agents",
    role: "Action layer",
    body: "Agents observe state, query the twin, recommend or make decisions, execute allowed actions, and log rationale. Always inside policy.",
    points: ["AI or deterministic", "Human-in-the-loop", "Policy-governed"],
  },
  {
    id: "apps",
    name: "Applications",
    role: "Experience layer",
    body: "Applications become purpose-built views over shared workflows, decisions, agents, and data. Build experiences without rebuilding the process.",
    points: ["Operator views", "Customer views", "Builder APIs"],
  },
];

export function OSLayers() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];

  return (
    <section className={`section ${styles.layersSection}`} id="os">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">The operating model</div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="h-lg">Five layers, one shared model of work.</h2>
        </Reveal>

        <div className={styles.modes}>
          <div className={styles.modeList} role="tablist" aria-label="OS layers">
            {LAYERS.map((l, i) => (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={styles.modeItem}
                data-active={i === active}
                onClick={() => setActive(i)}
              >
                <span className={styles.modeNo}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.modeName}>{l.name}</span>
                <span className={styles.modeRole}>{l.role}</span>
              </button>
            ))}
          </div>

          <div className={styles.modeDetail}>
            <h3>{layer.name}</h3>
            <p>{layer.body}</p>
            <ul>
              {layer.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
