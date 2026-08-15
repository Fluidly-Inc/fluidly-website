import { HeroBackdrop } from "../fx/HeroBackdrop";
import { Button, Reveal } from "../ui";
import styles from "./sections.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <HeroBackdrop />
      <div className={`wrap ${styles.heroInner}`}>
        <Reveal>
          <div className="eyebrow">Process Intelligence Operating System</div>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className={`h-xl ${styles.heroTitle}`}>
            Every organization runs on work.
            <br />
            <span className="accent">No one can see it.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className={`lede ${styles.heroCopy}`}>
            Your tools store records, not the work moving between them. Fluidly is the shared layer
            beneath your applications that makes work visible, explainable, and executable.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className={styles.heroActions}>
            <Button href="/#contact">Request a demo</Button>
            <Button href="/blog" variant="ghost">
              Read the blog
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
