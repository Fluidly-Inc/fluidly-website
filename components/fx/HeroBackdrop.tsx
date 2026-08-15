import styles from "./hero-backdrop.module.css";

/* Quiet hero backdrop for the flat dark aesthetic: a faint perspective grid
   with a soft cyan glow. Pure CSS, no canvas, respects reduced-motion. */
export function HeroBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden>
      <div className={styles.grid} />
      <div className={styles.glow} />
      <div className={styles.fade} />
    </div>
  );
}
