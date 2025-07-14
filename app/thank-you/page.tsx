import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";
import styles from "./page.module.css";

function ThankYouLoading() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        <div className={styles.iconContainer}>
          <div className={styles.loader}></div>
        </div>
        <h1 className={styles.title}>Loading...</h1>
      </section>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouLoading />}>
      <ThankYouContent />
    </Suspense>
  );
}
