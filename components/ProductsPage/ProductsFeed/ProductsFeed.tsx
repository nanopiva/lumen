"use client";

import { useEffect, useState } from "react";
import ProductCardClient from "../ProductCardClient/ProductCardClient";
import { Filters } from "../FiltersSidebar/FiltersSidebar";
import styles from "./ProductsFeed.module.css";

export type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string | null;
  description: string;
  stock: number;
  brand_id: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  brand: { id: string; name: string } | null;
  category: { id: string; name: string } | null;
  subcategory: { id: string; name: string } | null;
  is_featured: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
};

const LIMIT = 20;

type Props = {
  filters: Filters;
  adminMode?: boolean;
};

export default function ProductsFeed({ filters, adminMode = false }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchProducts = async (reset = false) => {
    setIsLoading(true);

    try {
      const query = new URLSearchParams({
        ...(filters.search ? { search: filters.search } : {}),
        ...(filters.category ? { category: filters.category } : {}),
        ...(filters.subcategory ? { subcategory: filters.subcategory } : {}),
        ...(filters.brand ? { brand: filters.brand } : {}),
        ...(filters.minPrice ? { minPrice: filters.minPrice.toString() } : {}),
        ...(filters.maxPrice ? { maxPrice: filters.maxPrice.toString() } : {}),
        ...(adminMode ? { includeOutOfStock: "true" } : {}),
        ...(adminMode && filters.showDeleted ? { includeDeleted: "true" } : {}),

        offset: reset ? "0" : offset.toString(),
        limit: LIMIT.toString(),
      }).toString();

      const res = await fetch(`/api/products?${query}`);
      const data = (await res.json()) as Product[];

      if (reset) {
        setProducts(data);
        setOffset(LIMIT);
        setHasMore(data.length === LIMIT);
      } else {
        setProducts((prev) => {
          const all = [...prev, ...data];
          const unique = Array.from(
            new Map(all.map((p) => [p.id, p])).values()
          );
          return unique;
        });
        setOffset((prev) => prev + LIMIT);
        if (data.length < LIMIT) setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    setIsInitialLoad(true);
    fetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, adminMode]);

  const handleDelete = (id: string) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_deleted: true } : p))
    );

  return (
    <section className={styles.productsContainer}>
      {isInitialLoad && (
        <div className={styles.loaderContainer}>
          <div className="loader" role="status" aria-label="Cargando" />
        </div>
      )}

      {!isInitialLoad && products.length > 0 && (
        <>
          <div className={styles.productsGrid}>
            {products.map((p) => (
              <ProductCardClient
                key={p.id}
                product={p}
                adminMode={adminMode}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreContainer}>
              <button
                onClick={() => fetchProducts(false)}
                disabled={isLoading}
                className={styles.loadMoreButton}
              >
                {isLoading ? "Loading..." : "Load more products"}
              </button>
            </div>
          )}
        </>
      )}

      {!isInitialLoad && products.length === 0 && (
        <p className={styles.emptyMessage}>No products found</p>
      )}
    </section>
  );
}
