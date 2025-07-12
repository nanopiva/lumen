"use client";

import { useState } from "react";
import FiltersSidebar, {
  Filters,
} from "@/components/ProductsPage/FiltersSidebar/FiltersSidebar";
import ProductsFeed from "@/components/ProductsPage/ProductsFeed/ProductsFeed";
import styles from "./page.module.css";

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>({});

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      search: value.trim() ? value : undefined,
    }));
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Professional Tools</h1>
          <p className={styles.heroSubtitle}>
            Precision-engineered tools for craftsmen and professionals
          </p>
          <div className={styles.heroAccent}></div>
        </div>
      </section>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search || ""}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sidebarWrapper}>
          <FiltersSidebar filters={filters} onChange={setFilters} />
        </div>
        <div className={styles.productsWrapper}>
          <ProductsFeed filters={filters} />
        </div>
      </div>
    </main>
  );
}
