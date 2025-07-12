import styles from "./AboutSection.module.css";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h2 className={styles.heading}>Crafted for Professionals</h2>
          <p className={styles.paragraph}>
            At Lumen Tools, we believe that precision and endurance are not just
            features — they&apos;re the foundation of real work. We design tools
            that meet the expectations of those who demand the best, day in and
            day out.
          </p>
          <p className={styles.paragraph}>
            Our commitment to quality comes from years of experience in the
            field. Every item we offer is tested, refined, and built to last —
            whether you&apos;re on a job site or in your workshop.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <Image
            src="/aboutImage.jpg"
            alt="Professional tools on a workbench"
            width={600}
            height={400}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
}
