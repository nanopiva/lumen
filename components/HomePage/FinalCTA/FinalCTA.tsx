import styles from "./FinalCTA.module.css";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to Upgrade Your Toolbox?</h2>
        <p className={styles.subtitle}>
          Discover high-quality tools designed for real professionals.
        </p>
        <Link href="/products" className={styles.button}>
          Browse Products
        </Link>
      </div>
    </section>
  );
}
