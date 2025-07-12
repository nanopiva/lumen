"use client";

import { useState } from "react";
import FiltersSidebar, {
  Filters,
} from "@/components/ProductsPage/FiltersSidebar/FiltersSidebar";
import ProductsFeed from "@/components/ProductsPage/ProductsFeed/ProductsFeed";
import CreateProductModal from "@/components/Admin/CreateProductModal/CreateProductModal";
import styles from "./ProductsAdmin.module.css";

export default function ProductsAdmin() {
  const [filters, setFilters] = useState<Filters>({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      search: value.trim() ? value : undefined,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search || ""}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <button
          className={styles.addButton}
          onClick={() => setShowCreateModal(true)}
        >
          Add Product <span className={styles.plus}>+</span>
        </button>
        {showCreateModal && (
          <CreateProductModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>

      <div className={styles.layout}>
        <FiltersSidebar
          filters={filters}
          onChange={setFilters}
          isAdmin={true}
        />
        <ProductsFeed filters={filters} adminMode />
      </div>
    </div>
  );
}
