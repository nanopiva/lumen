import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have questions or want to discuss tools? Reach out to our team.
          </p>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <h3 className={styles.infoTitle}>Our Location</h3>
            <p className={styles.infoText}>
              123 Tool Street
              <br />
              Workshop District
              <br />
              Portland, OR 97205
            </p>
            <p className={styles.disclaimer}>*Fictional address</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <h3 className={styles.infoTitle}>Email Us</h3>
            <p className={styles.infoText}>
              info@lumentools.com
              <br />
              support@lumentools.com
            </p>
            <p className={styles.disclaimer}>*Example emails - not monitored</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            </div>
            <h3 className={styles.infoTitle}>Call Us</h3>
            <p className={styles.infoText}>
              (555) 123-4567
              <br />
              Mon-Fri: 9am-5pm PST
            </p>
            <p className={styles.disclaimer}>*Fictional phone number</p>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <p className={styles.formDescription}>
            We&apos;ll get back to you as soon as possible
          </p>

          <form className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={styles.formInput}
                  placeholder="Your name"
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.formInput}
                  placeholder="your.email@example.com"
                  disabled
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.formLabel}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className={styles.formInput}
                placeholder="What's this about?"
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Message
              </label>
              <textarea
                id="message"
                className={styles.formTextarea}
                placeholder="Your message here..."
                rows={5}
                disabled
              ></textarea>
            </div>

            <button type="button" className={styles.submitButton} disabled>
              Send Message (Disabled for Demo)
            </button>
          </form>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className={styles.noticeContainer}>
          <div className={styles.noticeIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
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
