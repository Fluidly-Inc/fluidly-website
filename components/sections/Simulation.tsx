"use client";

import { useMemo, useState } from "react";
import { Button, Reveal } from "../ui";
import styles from "./sections.module.css";

const NODES = [
  { id: "risk", label: "Risk", cx: 650, cy: 80 },
  { id: "sla", label: "SLA", cx: 650, cy: 190 },
  { id: "cost", label: "Cost", cx: 650, cy: 310 },
  { id: "capacity", label: "Capacity", cx: 650, cy: 430 },
];

/* Simulation math ported verbatim from the original script.js:74-96. */
function derive(value: number) {
  const delta = value - 30;
  const affected = Math.max(420, Math.round(1248 + delta * 34.5));
  const risk =
    value < 25 ? "High review load" : value > 60 ? "Elevated clinical risk" : "Balanced";
  const event =
    value > 60
      ? `Longer renewal windows reduce review volume but increase clinical-risk exposure across ${affected.toLocaleString()} Work Items.`
      : value < 25
      ? `Shorter renewal windows improve safety controls but increase provider review volume and SLA pressure across ${affected.toLocaleString()} Work Items.`
      : `This threshold creates a balanced tradeoff across safety, workload, SLA, cost, and capacity.`;
  return {
    delta,
    affected,
    risk,
    event,
    policyLabel: delta === 0 ? "Baseline" : `${delta > 0 ? "+" : ""}${delta} days`,
  };
}

export function Simulation() {
  const [value, setValue] = useState(30);
  const [ran, setRan] = useState(false);
  const d = useMemo(() => derive(value), [value]);

  return (
    <section className={`section ${styles.impactSection}`} id="simulate">
      <div className="wrap">
        <div className={styles.splitHead}>
          <div>
            <Reveal>
              <div className="eyebrow">The moment enterprise software changes</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-lg">Simulation before execution.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede">
              Change a policy, threshold, workflow, capacity rule, or agent behavior, and see the
              downstream consequences before production.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className={styles.impactLab}>
            <aside className={styles.impactControls}>
              <div>
                <small className={styles.panelLabel}>What-if simulation</small>
                <h3>Medication renewal threshold</h3>
              </div>

              <label className={styles.rangeLabel}>
                Days since latest lab
                <output>{value} days</output>
              </label>
              <input
                type="range"
                min={15}
                max={90}
                step={5}
                value={value}
                onChange={(e) => {
                  setValue(Number(e.target.value));
                  setRan(false);
                }}
                className={styles.range}
              />

              <div className={styles.impactSummary}>
                <div>
                  <span>Policy change</span>
                  <strong>{d.policyLabel}</strong>
                </div>
                <div>
                  <span>Impacted work</span>
                  <strong>{d.affected.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Risk state</span>
                  <strong>{d.risk}</strong>
                </div>
              </div>

              <Button full onClick={() => setRan(true)}>
                Run simulation
              </Button>
            </aside>

            <div className={styles.impactMap}>
              <svg viewBox="0 0 760 520" role="img" aria-label="Upstream and downstream impact graph">
                <g className={styles.impactLines}>
                  <path d="M160 260 C250 260 260 150 360 150" />
                  <path d="M160 260 C250 260 260 370 360 370" />
                  <path d="M400 150 C510 150 520 80 620 80" />
                  <path d="M400 150 C510 150 520 190 620 190" />
                  <path d="M400 370 C510 370 520 310 620 310" />
                  <path d="M400 370 C510 370 520 430 620 430" />
                </g>
                <g className={`${styles.impactNode} ${styles.source}`}>
                  <circle cx="130" cy="260" r="42" />
                  <text x="130" y="252">Policy</text>
                  <text x="130" y="270">Threshold</text>
                </g>
                <g className={`${styles.impactNode} ${styles.middle}`}>
                  <circle cx="380" cy="150" r="48" />
                  <text x="380" y="144">Clinical</text>
                  <text x="380" y="162">Review</text>
                </g>
                <g className={`${styles.impactNode} ${styles.middle}`}>
                  <circle cx="380" cy="370" r="48" />
                  <text x="380" y="364">Workflow</text>
                  <text x="380" y="382">Routing</text>
                </g>
                {NODES.map((n, i) => (
                  <g
                    key={n.id}
                    className={styles.impactNode}
                    data-live={ran ? "true" : "false"}
                    style={{ ["--i" as string]: i }}
                  >
                    <circle cx={n.cx} cy={n.cy} r="38" />
                    <text x={n.cx} y={n.cy + 4}>
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
              <div className={styles.impactEvent} aria-live="polite">
                {ran ? d.event : "Adjust the policy threshold, then run the simulation to reveal downstream effects."}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
