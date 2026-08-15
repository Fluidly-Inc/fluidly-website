"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "../ui";
import styles from "./sections.module.css";

const PRIMITIVES = ["Work Item", "Decision", "Policy", "Agent", "Outcome"] as const;
type Primitive = (typeof PRIMITIVES)[number];

/* Descriptions + derived-metric logic ported from script.js:108-154. */
const DESCRIPTIONS: Record<Primitive, string> = {
  "Work Item": "Creates the unit of work and its lifecycle.",
  Decision: "Adds an explicit decision point with traceable rationale.",
  Policy: "Constrains what actions and transitions are allowed.",
  Agent: "Introduces an actor that can observe, decide, or execute.",
  Outcome: "Closes the learning loop by recording what happened.",
};

export function Playground() {
  const [flow, setFlow] = useState<Primitive[]>([]);

  const add = (p: Primitive) => setFlow((f) => (f.length >= 7 ? f : [...f, p]));
  const reset = () => setFlow([]);

  const decisions = flow.filter((x) => x === "Decision").length;
  const agents = flow.filter((x) => x === "Agent").length;
  const automatable = agents ? Math.max(1, agents + decisions) : 0;
  const last = flow[flow.length - 1];
  const full = flow.length >= 7;

  return (
    <section className={`section ${styles.playgroundSection}`} id="playground">
      <div className="wrap">
        <div className={styles.splitHead}>
          <div>
            <Reveal>
              <div className="eyebrow">Interactive process playground</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-lg">Build the operating model yourself.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede">
              Add primitives to the process and watch Fluidly turn them into an execution-aware
              model.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className={styles.playground}>
            <aside className={styles.palette}>
              <small className={styles.panelLabel}>Add a primitive</small>
              {PRIMITIVES.map((p) => (
                <button key={p} type="button" onClick={() => add(p)} className={styles.paletteBtn}>
                  + {p}
                </button>
              ))}
              <button type="button" onClick={reset} className={styles.resetBtn}>
                Reset process
              </button>
            </aside>

            <div className={styles.canvas}>
              {flow.length === 0 ? (
                <div className={styles.canvasEmpty}>
                  <span />
                  <strong>Your process starts here.</strong>
                  <p>Add a Work Item to begin.</p>
                </div>
              ) : (
                <div className={styles.processFlow} aria-live="polite">
                  <AnimatePresence initial={false}>
                    {flow.map((type, i) => (
                      <motion.div
                        key={`${type}-${i}`}
                        className={styles.flowGroup}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {i > 0 && <span className={styles.flowEdge} />}
                        <article className={styles.processNode}>
                          <small>
                            {String(i + 1).padStart(2, "0")} · {type.toUpperCase()}
                          </small>
                          <strong>{type}</strong>
                        </article>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <aside className={styles.inspector}>
              <small className={styles.panelLabel}>Fluidly interpretation</small>
              <div className={styles.inspectorState}>
                {full ? (
                  <>
                    <strong>Process ready</strong>
                    <p>This compact playground supports seven primitives. Reset to build another model.</p>
                  </>
                ) : flow.length === 0 ? (
                  <>
                    <strong>No execution model yet</strong>
                    <p>Add primitives to see how Fluidly understands the process.</p>
                  </>
                ) : (
                  <>
                    <strong>{last} added</strong>
                    <p>
                      {DESCRIPTIONS[last]} Fluidly now sees {flow.length} connected primitive
                      {flow.length === 1 ? "" : "s"} in the execution model.
                    </p>
                  </>
                )}
              </div>
              <div className={styles.inspectorMetrics}>
                <div>
                  <span>Primitives</span>
                  <strong>{flow.length}</strong>
                </div>
                <div>
                  <span>Decision points</span>
                  <strong>{decisions}</strong>
                </div>
                <div>
                  <span>Automatable actions</span>
                  <strong>{automatable}</strong>
                </div>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
