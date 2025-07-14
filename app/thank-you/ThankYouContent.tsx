"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.replace("/products");
    }
  }, [orderId, router]);

  useEffect(() => {
    // loader se remueve si por alguna razón permanece visible
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.remove();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        <div className={styles.iconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1 className={styles.title}>Thank you for your demo purchase!</h1>
        <p className={styles.message}>
          Your demo order <strong>#{orderId}</strong> was received successfully.
        </p>
        <div className={styles.demoNotice}>
          <p>
            <strong>Demo Notice:</strong> This was a simulation only. No real
            purchase was made. The confirmation email is for demonstration
            purposes.
          </p>
        </div>
        <p className={styles.details}>
          A demo confirmation email has been sent with your order details.
        </p>
        <div className={styles.actions}>
          <Link href="/products" className={styles.continueShopping}>
            Continue shopping
          </Link>
        </div>
        <div className={styles.support}>
          <p>Questions about this demo?</p>
          <a href="mailto:mpiva24@gmail.com" className={styles.contactLink}>
            Contact us: mpiva24@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}
