"use client";

import { useState, useMemo } from "react";
import styles from "./FeaturedManager.module.css";

type ProductLite = {
  id: string;
  title: string;
  image_url: string | null;
  is_featured: boolean;
};

type Props = { products: ProductLite[] };

const MAX_FEATURED = 8;

export default function FeaturedManager({ products }: Props) {
  const [items, setItems] = useState(products);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const featuredCount = useMemo(
    () => items.filter((p) => p.is_featured).length,
    [items]
  );

  const toggleFeatured = async (id: string, value: boolean) => {
    if (!value && featuredCount === 0) return;
    if (value && featuredCount >= MAX_FEATURED) return;

    setIsLoading(true);
    setSavingId(id);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: value }),
      });

      if (!res.ok) {
        alert("Error updating product");
      } else {
        setItems((prev) =>
          prev.map((p) => (p.id === id ? { ...p, is_featured: value } : p))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSavingId(null);
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>
        Featured Products Manager{" "}
        <span className={styles.counter}>
          ({featuredCount}/{MAX_FEATURED} selected)
        </span>
      </h1>

      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const disableCheckbox =
                savingId === p.id ||
                (!p.is_featured && featuredCount >= MAX_FEATURED);

              return (
                <tr key={p.id}>
                  <td>
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        width={50}
                        height={50}
                        className={styles.productImage}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={p.is_featured}
                      disabled={disableCheckbox}
                      onChange={(e) => toggleFeatured(p.id, e.target.checked)}
                      className={styles.checkbox}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
