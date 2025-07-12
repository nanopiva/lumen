"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Admin/BreadCrumbs/BreadCrumbs";
import styles from "./AdminHeader.module.css";
import { useState } from "react";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === "/admin/dashboard";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      {!isDashboard && (
        <button
          onClick={() => router.back()}
          className={styles.backBtn}
          aria-label="Go back"
        >
          ←
        </button>
      )}

      <div className={styles.breadcrumbWrapper}>
        <Breadcrumbs />
      </div>

      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav
        className={`${styles.quickLinks} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
          Dashboard
        </Link>
        <Link href="/admin/products" onClick={() => setMobileMenuOpen(false)}>
          Products
        </Link>
        <Link href="/admin/orders" onClick={() => setMobileMenuOpen(false)}>
          Orders
        </Link>
        <Link href="/admin/taxonomies" onClick={() => setMobileMenuOpen(false)}>
          Taxonomies
        </Link>
        <Link href="/admin/featured" onClick={() => setMobileMenuOpen(false)}>
          Featured
        </Link>
      </nav>
    </header>
  );
}
