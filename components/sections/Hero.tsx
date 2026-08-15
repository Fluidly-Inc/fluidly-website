"use client";

import { motion } from "motion/react";
import { ParticleField } from "../fx/ParticleField";
import { Button } from "../ui";
import styles from "./sections.module.css";

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <ParticleField className={styles.heroCanvas} />
      <div className={styles.heroGlow} aria-hidden />
      <div className={styles.heroVignette} aria-hidden />

      <div className={styles.heroInner}>
        <motion.div custom={0} variants={rise} initial="hidden" animate="show" className="eyebrow">
          A new computing layer for work
        </motion.div>

        <motion.h1 custom={1} variants={rise} initial="hidden" animate="show" className={styles.heroTitle}>
          Every organization runs on work.
          <span className="gradient-text">Yet no one can actually see it.</span>
        </motion.h1>

        <motion.p custom={2} variants={rise} initial="hidden" animate="show" className={styles.heroCopy}>
          CRMs store customers. ERPs store transactions. EHRs store records. None of them
          understand how work actually moves. Fluidly does.
        </motion.p>

        <motion.div custom={3} variants={rise} initial="hidden" animate="show" className={styles.heroActions}>
          <Button href="#problem">Experience the idea</Button>
          <Button href="#playground" variant="ghost">
            Build a process
          </Button>
        </motion.div>
      </div>

      <div className={styles.scrollCue} aria-hidden>
        <span className={styles.scrollDot} />
        Scroll to reveal the system
      </div>
    </section>
  );
}
