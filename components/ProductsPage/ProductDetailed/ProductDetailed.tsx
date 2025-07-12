"use client";

import styles from "./ProductDetailed.module.css";
import { Product } from "@/components/ProductsPage/ProductsFeed/ProductsFeed";
import { useCart } from "@/components/CartContext";
import { useState, useMemo } from "react";

type Props = {
  product: Product;
};

export default function ProductDetailed({ product }: Props) {
  const { addItem, items } = useCart();

  const inCart = useMemo(
    () => items.find((i) => i.productId === product.id)?.quantity ?? 0,
    [items, product.id]
  );

  const available = Math.max(product.stock - inCart, 0);
  const [quantity, setQuantity] = useState(available > 0 ? 1 : 0);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (e.target.value === "") {
      setQuantity(NaN);
      setError("");
      return;
    }

    if (value < 1) {
      setQuantity(1);
      setError("Minimum 1");
    } else if (value > available) {
      setQuantity(available);
      setError(`Only ${available} left`);
    } else {
      setQuantity(value);
      setError("");
    }
  };

  const handleAddToCart = () => {
    if (!available || quantity < 1 || quantity > available) return;
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image_url,
      quantity,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>No image available</div>
          )}
        </div>

        <div className={styles.details}>
          <div className={styles.header}>
            <h1 className={styles.title}>{product.title}</h1>
            {product.brand && (
              <p className={styles.brand}>Brand: {product.brand.name}</p>
            )}
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{product.description}</p>
          </div>

          <div className={styles.availability}>
            <p className={styles.stock}>
              {available > 0
                ? `🟢 In stock (${available} available${
                    inCart ? `, ${inCart} in cart` : ""
                  })`
                : "🔴 Out of stock"}
            </p>
          </div>

          {available > 0 && (
            <div className={styles.cartControls}>
              <div className={styles.quantityGroup}>
                <label htmlFor="quantity" className={styles.quantityLabel}>
                  Quantity:
                </label>
                <div className={styles.quantityInputWrapper}>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    max={available}
                    value={isNaN(quantity) ? "" : quantity}
                    onChange={handleChange}
                    className={styles.quantityInput}
                  />
                  {error && (
                    <span className={styles.errorMessage}>{error}</span>
                  )}
                </div>
              </div>

              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={!quantity || quantity > available}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.additionalInfoSection}>
        <h3 className={styles.sectionTitle}>About this product</h3>
        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>•</span>
            <span>30-day satisfaction guarantee</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>•</span>
            <span>Free shipping on orders over $50</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>•</span>
            <span>High-quality materials</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>•</span>
            <span>Eco-friendly packaging</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
