import styles from "./page.module.css";

export default function TermsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Terms&nbsp;of&nbsp;Service</h1>
      <p className={styles.updated}>Last updated: 2 July 2025</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Introduction</h2>
        <p className={styles.sectionText}>
          Welcome to <strong className={styles.strong}>Lumen Tools</strong> (the
          &quot;Site&quot;). This Site is a
          <em className={styles.em}> non-commercial demo</em> created solely to
          showcase web-development skills in a portfolio context. No real
          products are sold or shipped, no payments are processed, and no legal
          contract of sale is formed when you interact with the Site.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Non-Commercial Purpose</h2>
        <p className={styles.sectionText}>
          All listings, prices, and inventory data are fictitious. Any
          &quot;order&quot; you place is recorded in a Supabase database only
          for demonstration of CRUD functionality. You will receive a
          confirmation e-mail generated via Resend explaining that the purchase
          is simulated.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. User Data</h2>
        <p className={styles.sectionText}>
          During checkout you may be asked to provide a name, e-mail address,
          and shipping address. These details are stored in Supabase and
          displayed in a private CMS interface solely to illustrate
          administrative features. They are{" "}
          <strong className={styles.strong}>not</strong> used for marketing,
          shared with third parties, or validated for authenticity. See
          our&nbsp;
          <a href="/privacy" className={styles.link}>
            Privacy&nbsp;Policy
          </a>{" "}
          for more information.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Intellectual Property</h2>
        <p className={styles.sectionText}>
          The code, design, and content of this Site are the intellectual
          property of the developer. Product photos and trademarks shown remain
          the property of their respective owners and are used here for
          illustrative purposes only.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Disclaimer of Liability</h2>
        <p className={styles.sectionText}>
          The Site is provided &quot;as is&quot; without warranties of any kind.
          Under no circumstances shall the developer be liable for any loss or
          damage arising from the use of—or inability to use—the Site or any
          reliance on the simulated data presented herein.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Governing Law</h2>
        <p className={styles.sectionText}>
          These Terms are governed by the laws of Argentina, without regard to
          its conflict-of-law provisions.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Contact</h2>
        <p className={styles.sectionText}>
          Questions about these Terms? Reach out at&nbsp;
          <a href="mailto:mpiva24@gmail.com" className={styles.link}>
            mpiva24@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
