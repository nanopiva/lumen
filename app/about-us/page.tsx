import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Our Story</h1>
          <p className={styles.subtitle}>
            Connecting professionals with the finest tools from leading
            manufacturers worldwide
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2>Who We Are</h2>
            <p className={styles.sectionText}>
              Lumen Tools is a premier distributor of professional-grade tools,
              carefully curating products from the most reputable brands in the
              industry. We bridge the gap between manufacturers and
              professionals who demand reliability and performance.
            </p>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>Expert Curation</h3>
              <p>
                We rigorously test and select only the most dependable tools
                across all price points, saving you time and research.
              </p>
            </div>
            <div className={styles.feature}>
              <h3>Technical Knowledge</h3>
              <p>
                Our team understands tool specifications and applications
                deeply, providing accurate recommendations for your specific
                needs.
              </p>
            </div>
            <div className={styles.feature}>
              <h3>Direct Partnerships</h3>
              <p>
                We maintain strong relationships with manufacturers to bring you
                authentic products with full warranties and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionContainer}>
          <div className={styles.history}>
            <div className={styles.historyContent}>
              <h2>Our Journey</h2>
              <p>
                Founded in 2012, Lumen Tools began as a specialized tool
                supplier for local contractors and craftsmen. Word of our
                knowledgeable service and quality selection quickly spread.
              </p>
              <p>
                Today, we serve professionals across multiple industries while
                maintaining our commitment to personalized service and technical
                expertise.
              </p>
            </div>
            <div className={styles.historyImage}>
              <img
                src="/aboutImage.png"
                alt="Lumen Tools journey from 2012 to present"
                className={styles.historyImg}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2>Why Choose Lumen Tools</h2>
            <p className={styles.sectionText}>
              What sets us apart in the tools distribution industry
            </p>
          </div>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <ToolboxIcon />
              </div>
              <h3>Inventory Ready</h3>
              <p>
                We stock popular items for immediate shipment with real-time
                inventory updates.
              </p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <ShieldIcon />
              </div>
              <h3>Genuine Products</h3>
              <p>
                All items are sourced through official channels with complete
                documentation.
              </p>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>
                <CheckIcon />
              </div>
              <h3>Unbiased Advice</h3>
              <p>
                Our recommendations are based on performance data, not brand
                partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className={styles.noticeContainer}>
          <div className={styles.noticeIcon}>
            <InfoIcon />
          </div>
          <p className={styles.noticeText}>
            <strong>Disclaimer:</strong> Lumen Tools is a fictional brand
            created as part of a personal design and development project. It is
            not affiliated with any real company or commercial activity.
          </p>
        </div>
      </section>
    </main>
  );
}

function ToolboxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}
