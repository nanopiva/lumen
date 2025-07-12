"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/components/ProductsPage/ProductsFeed/ProductsFeed";
import ProductCardClient from "@/components/ProductsPage/ProductCardClient/ProductCardClient";
import styles from "./FeaturedProducts.module.css";

const AUTO_SCROLL_MS = 4000;
const CARD_GAP_PX = 24;

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/featured-products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (Array.isArray(data)) setProducts(data as Product[]);
        else throw new Error("Not expected answer");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error loading products";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollByCard = (dir: "prev" | "next") => {
    const track = trackRef.current;
    if (!track || products.length === 0) return;

    const cardWidth = track.firstElementChild!.clientWidth;
    const scrollAmount = cardWidth + CARD_GAP_PX;

    if (dir === "next") {
      const isAtEnd =
        track.scrollLeft + track.clientWidth + 5 >= track.scrollWidth;
      track.scrollTo({
        left: isAtEnd ? 0 : track.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    } else {
      const isAtStart = track.scrollLeft - scrollAmount < 0;
      track.scrollTo({
        left: isAtStart ? track.scrollWidth : track.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (products.length === 0) return;

    const start = () =>
      (autoRef.current = setInterval(
        () => scrollByCard("next"),
        AUTO_SCROLL_MS
      ));
    const stop = () => autoRef.current && clearInterval(autoRef.current);

    start();

    const track = trackRef.current;
    track?.addEventListener("mouseenter", stop);
    track?.addEventListener("mouseleave", start);

    return () => {
      stop();
      track?.removeEventListener("mouseenter", stop);
      track?.removeEventListener("mouseleave", start);
    };
  }, [products]);

  return (
    <section className={styles.wrapper}>
      {loading && (
        <div className={styles.loaderContainer}>
          <div className="loader" role="status" aria-label="Loading" />
        </div>
      )}

      {error && !loading && <p className={styles.error}>{error}</p>}

      {!loading && !error && products.length > 0 && (
        <>
          <h2 className={styles.title}>Featured Products</h2>

          <button
            className={`${styles.arrow} ${styles.prev}`}
            aria-label="Previous product"
            onClick={() => scrollByCard("prev")}
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.next}`}
            aria-label="Next product"
            onClick={() => scrollByCard("next")}
          >
            ›
          </button>

          <div className={styles.track} ref={trackRef}>
            {products.map((product) => (
              <div key={product.id} className={styles.slide}>
                <ProductCardClient product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
