"use client";

import TaxonomyList from "@/components/Admin/Taxonomies/TaxonomyList/TaxonomyList";
import styles from "./page.module.css";

export default function TaxonomiesAdmin() {
  return (
    <div className={styles.taxonomiesGrid}>
      <TaxonomyList type="category" title="Categories" />
      <TaxonomyList type="subcategory" title="Subcategories" />
      <TaxonomyList type="brand" title="Brands" />
    </div>
  );
}
