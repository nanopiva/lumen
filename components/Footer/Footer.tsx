import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

import linkedinLogo from "../../public/linkedinLogo.svg";
import githubLogo from "../../public/githubLogo.svg";
import portfolioLogo from "../../public/portfolioLogo.svg";
import lumenLogo from "../../public/lumenLogo.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <Image
              src={lumenLogo}
              width={50}
              height={50}
              alt="Lumen Tools Logo"
              className={styles.companyLogo}
            />
            <div>
              <h2 className={styles.logo}>Lumen Tools</h2>
              <p className={styles.slogan}>Power. Precision. Lumen</p>
            </div>
          </div>
          <p className={styles.description}>
            Precision tools for professionals who demand the best.
          </p>
        </div>

        <div className={styles.mobileHidden}>
          <div className={styles.section}>
            <h3 className={styles.title}>Navigation</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/products" className={styles.navLink}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about-us" className={styles.navLink}>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.navLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Connect</h3>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>Developer contact:</span>
            <a href="mailto:mpiva24@gmail.com" className={styles.contactLink}>
              mpiva24@gmail.com
            </a>
          </div>
          <div className={styles.socialContainer}>
            <h4 className={styles.socialTitle}>Relevant Links</h4>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/nanopiva"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <Image
                  src={githubLogo}
                  width={20}
                  height={20}
                  alt="GitHub"
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Image
                  src={linkedinLogo}
                  width={20}
                  height={20}
                  alt="LinkedIn"
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://nanop.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Portfolio"
              >
                <Image
                  src={portfolioLogo}
                  width={20}
                  height={20}
                  alt="Portfolio"
                  className={styles.socialIcon}
                />
              </a>
            </div>
          </div>
          <Link href="/admin/login" className={styles.admin}>
            Login CMS
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Lumen Tools. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <Link href="/privacy">Privacy policy</Link>
          <span className={styles.separator}>|</span>
          <Link href="/terms">Terms of service</Link>
        </div>
      </div>
    </footer>
  );
}
