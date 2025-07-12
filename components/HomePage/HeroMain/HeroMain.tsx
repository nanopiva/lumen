import styles from "./HeroMain.module.css";
import Link from "next/link";

export default function HeroMain() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>Tools that are up to the task</h1>
          <p className={styles.subtitle}>
            At Lumen Tools we combine precision, durability and industrial
            design.
          </p>
          <Link href="/products" className={styles.cta}>
            View products
          </Link>
        </div>
      </div>
    </section>
  );
}
