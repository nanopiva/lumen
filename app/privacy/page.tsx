import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Lumen Tools (Demo)",
  description:
    "How personal information is collected, stored, and used on the Lumen Tools demo store.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Privacy&nbsp;Policy</h1>
      <p className={styles.updated}>Last updated: 2 July 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Introduction</h2>
        <p className={styles.sectionText}>
          This Privacy Policy explains how{" "}
          <strong className={styles.strong}>Lumen Tools</strong> (the
          &quot;Site&quot;) handles personal information. The Site is a{" "}
          <em className={styles.em}>non-commercial</em> demo built to showcase
          web-development skills; it does not sell real products or process
          payments.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Data&nbsp;We&nbsp;Collect</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.strong}>Checkout data</strong> – name,
            e-mail address, and shipping address entered during the simulated
            purchase flow.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.strong}>Order metadata</strong> – items
            placed in cart, subtotal, and timestamp.
          </li>
          <li className={styles.listItem}>
            <strong className={styles.strong}>Technical data</strong> –
            anonymized analytics (page views, browser type) gathered
            automatically by the hosting platform.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          3. How&nbsp;We&nbsp;Use&nbsp;Your&nbsp;Data
        </h2>
        <p className={styles.sectionText}>
          Collected data is used strictly for demonstration purposes:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            To write a mock &quot;order&quot; to a Supabase database and render
            it in the private CMS dashboard.
          </li>
          <li className={styles.listItem}>
            To send an automated confirmation e-mail via Resend informing you
            that no actual purchase was made.
          </li>
          <li className={styles.listItem}>
            To analyze aggregated traffic and improve portfolio performance.
          </li>
        </ul>
        <p className={styles.sectionText}>
          Data is <strong className={styles.strong}>never</strong> sold, shared,
          or used for marketing.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          4. Storage&nbsp;&amp;&nbsp;Security
        </h2>
        <p className={styles.sectionText}>
          Personal data is stored on Supabase, a managed PostgreSQL service, in
          servers located in the United States and protected by encryption at
          rest and in transit. Access is restricted to the developer via secure
          credentials and row-level security rules.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. E-mail&nbsp;Communications</h2>
        <p className={styles.sectionText}>
          We send one transactional e-mail after checkout. Resend processes the
          e-mail address solely for delivery and deletion upon success. No
          newsletters or promotional campaigns are sent.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          6. Cookies&nbsp;&amp;&nbsp;Tracking
        </h2>
        <p className={styles.sectionText}>
          The Site uses only essential, short-lived cookies (e.g., to preserve
          cart contents). No third-party advertising or cross-site tracking
          cookies are employed.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Data&nbsp;Sharing</h2>
        <p className={styles.sectionText}>
          Other than Supabase and Resend, no third parties receive your data.
          Both providers act as data processors under this policy.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Data&nbsp;Retention</h2>
        <p className={styles.sectionText}>
          Demo orders are retained indefinitely to illustrate historical records
          in the CMS. You may request deletion at any time (see Section 9).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>9. Your&nbsp;Rights</h2>
        <p className={styles.sectionText}>
          In accordance with Argentina&apos;s Personal Data Protection
          Law (25.326) and similar regulations, you may:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            Request a copy of the personal data we hold about you.
          </li>
          <li className={styles.listItem}>
            Ask for corrections or deletion of that data.
          </li>
        </ul>
        <p className={styles.sectionText}>
          To exercise these rights, e-mail{" "}
          <a href="mailto:mpiva24@gmail.com" className={styles.link}>
            mpiva24@gmail.com
          </a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          10. Children&apos;s&nbsp;Privacy
        </h2>
        <p className={styles.sectionText}>
          The Site is not directed to children under 13. We do not knowingly
          collect personal information from minors.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          11. Changes&nbsp;to&nbsp;This&nbsp;Policy
        </h2>
        <p className={styles.sectionText}>
          Minor updates may be made to clarify practices. Material changes will
          be announced on this page with an updated &quot;Last updated&quot;
          date.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>12. Contact</h2>
        <p className={styles.sectionText}>
          Questions? Reach out at{" "}
          <a href="mailto:mpiva24@gmail.com" className={styles.link}>
            mpiva24@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
