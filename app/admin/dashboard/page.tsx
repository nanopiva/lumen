"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import styles from "./page.module.css";

export default function AdminDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>Complete e-commerce management</p>
      </header>

      <div className={styles.grid}>
        <Link href="/admin/products" className={styles.card}>
          <div className={styles.cardIcon}>📦</div>
          <div className={styles.cardContent}>
            <h2>Products</h2>
            <p>Manage your product catalog</p>
          </div>
        </Link>

        <Link href="/admin/orders" className={styles.card}>
          <div className={styles.cardIcon}>🛒</div>
          <div className={styles.cardContent}>
            <h2>Orders</h2>
            <p>View and process customer orders</p>
          </div>
        </Link>

        <Link href="/admin/taxonomies" className={styles.card}>
          <div className={styles.cardIcon}>🏷️</div>
          <div className={styles.cardContent}>
            <h2>Taxonomies</h2>
            <p>Organize categories, subcategories and brands</p>
          </div>
        </Link>

        <Link href="/admin/featured" className={styles.card}>
          <div className={styles.cardIcon}>⭐</div>
          <div className={styles.cardContent}>
            <h2>Featured</h2>
            <p>Manage featured products</p>
          </div>
        </Link>
      </div>

      <div className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sign Out
        </button>
      </div>
    </main>
  );
}
