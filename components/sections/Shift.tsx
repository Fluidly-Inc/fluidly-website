"use client";

import { ScrollScene, motion, useTransform } from "../fx/ScrollScene";
import styles from "./sections.module.css";

const APPS = ["Operator App", "Executive App", "Customer App"];

export function Shift() {
  return (
    <ScrollScene height="240vh" className={styles.shift}>
      {(p) => <ShiftStage progress={p} />}
    </ScrollScene>
  );
}

function ShiftStage({ progress }: { progress: import("motion/react").MotionValue<number> }) {
  // headline crossfade
  const titleY = useTransform(progress, [0, 0.5], [40, 0]);
  const titleOpacity = useTransform(progress, [0, 0.3, 0.85, 1], [0, 1, 1, 0]);
  // apps float up to make room, OS layer rises from below
  const appsY = useTransform(progress, [0.2, 0.7], [70, -10]);
  const osY = useTransform(progress, [0.35, 0.8], [140, 0]);
  const osOpacity = useTransform(progress, [0.35, 0.65], [0, 1]);
  const osScale = useTransform(progress, [0.35, 0.8], [0.94, 1]);
  const gridOpacity = useTransform(progress, [0, 0.4], [0.15, 0.5]);

  return (
    <div className={styles.shiftStage}>
      <motion.div className={styles.shiftGrid} style={{ opacity: gridOpacity }} aria-hidden />

      <motion.div className={styles.shiftCopy} style={{ y: titleY, opacity: titleOpacity }}>
        <div className="eyebrow">The shift</div>
        <h2 className="h-xl">
          Work already exists.
          <br />
          <span className="gradient-text">Fluidly gives it an operating system.</span>
        </h2>
        <p className="lede">
          Not another application. A shared execution and intelligence layer beneath every
          application you already run.
        </p>
      </motion.div>

      <div className={styles.shiftDiagram}>
        <motion.div className={styles.shiftApps} style={{ y: appsY }}>
          {APPS.map((a) => (
            <span key={a} className={styles.shiftApp}>
              {a}
            </span>
          ))}
        </motion.div>

        <motion.div
          className={styles.shiftOs}
          style={{ y: osY, opacity: osOpacity, scale: osScale }}
        >
          <small>Fluidly Process Intelligence OS</small>
          <div className={styles.shiftOsGrid}>
            <span>Workflows</span>
            <span>Ontology</span>
            <span>Decisions</span>
            <span>Agents</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
