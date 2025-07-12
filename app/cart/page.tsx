"use client";

import styles from "./page.module.css";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const router = useRouter();
  const supabase = createClient();

  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [loadingStock, setLoadingStock] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      if (!items.length) {
        setStockMap({});
        setLoadingStock(false);
        return;
      }

      setLoadingStock(true);
      try {
        const ids = items.map((i) => i.productId);
        const { data, error } = await supabase
          .from("products")
          .select("id, stock")
          .in("id", ids);

        if (error) throw error;

        const map: Record<string, number> = {};
        data?.forEach((p) => (map[p.id] = p.stock));
        setStockMap(map);

        data?.forEach((p) => {
          const item = items.find((i) => i.productId === p.id);
          if (item && item.quantity > p.stock) {
            updateQuantity(p.id, Math.max(p.stock, 1));
          }
        });
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
        setLoadingStock(false);
      }
    };

    fetchStock();
  }, [items, updateQuantity, supabase]);

  const [draft, setDraft] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setDraft((prev) => {
      const next = { ...prev };
      items.forEach(
        (item) =>
          (next[item.productId] =
            prev[item.productId] ?? item.quantity.toString())
      );
      return next;
    });
  }, [items]);

  const handleDraftChange = (id: string, value: string, maxStock?: number) => {
    setDraft((d) => ({ ...d, [id]: value }));

    if (value === "") {
      setErrors((e) => ({ ...e, [id]: "Quantity required" }));
      return;
    }

    const num = Number(value);
    if (Number.isNaN(num)) return;

    if (num < 1) {
      updateQuantity(id, 1);
      setDraft((d) => ({ ...d, [id]: "1" }));
      setErrors((e) => ({ ...e, [id]: "Minimum 1" }));
    } else if (maxStock !== undefined && num > maxStock) {
      updateQuantity(id, maxStock);
      setDraft((d) => ({ ...d, [id]: maxStock.toString() }));
      setErrors((e) => ({ ...e, [id]: `Max stock: ${maxStock}` }));
    } else {
      updateQuantity(id, num);
      setErrors((e) => ({ ...e, [id]: "" }));
    }
  };

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const hasIssues =
    loadingStock ||
    Object.values(errors).some(Boolean) ||
    Object.values(draft).some((v) => v === "");

  // Carrito vacío
  if (!items.length) {
    return (
      <section className={styles.emptyCart}>
        <div className={styles.emptyCartContent}>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartText}>
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/products" className={styles.backToProducts}>
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
          <p className={styles.itemsCount}>
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className={styles.disclaimerBanner}>
          <p>
            <strong>Demo Notice:</strong> This is a simulation only. No real
            purchases will be made.
          </p>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {items.map((item) => {
              const stock = stockMap[item.productId];
              const value = draft[item.productId] ?? "";
              const errorMsg = errors[item.productId] || "";
              const outOfStock = stock === 0;

              return (
                <div key={item.productId} className={styles.cartItem}>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.title}
                      width={120}
                      height={120}
                      className={`${styles.image} ${
                        !item.image ? styles.placeholderImage : ""
                      }`}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>

                    <div className={styles.quantityControl}>
                      <label
                        htmlFor={`qty-${item.productId}`}
                        className={styles.quantityLabel}
                      >
                        Quantity:
                      </label>
                      <input
                        id={`qty-${item.productId}`}
                        type="number"
                        min={1}
                        value={value}
                        disabled={outOfStock}
                        onChange={(e) =>
                          handleDraftChange(
                            item.productId,
                            e.target.value,
                            stock
                          )
                        }
                        className={styles.quantityInput}
                      />
                      {errorMsg && (
                        <span className={styles.errorMsg}>{errorMsg}</span>
                      )}
                      {outOfStock && (
                        <span className={styles.errorMsg}>Out of stock</span>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryContent}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                className={styles.checkoutButton}
                onClick={() => router.push("/checkout")}
                disabled={hasIssues}
                title={
                  hasIssues ? "Fix quantity errors to continue" : undefined
                }
              >
                {hasIssues ? "Adjust quantities first" : "Proceed to Checkout"}
              </button>

              <div className={styles.demoNotice}>
                <p>
                  For reference only — this is a simulated confirmation and not
                  related to a real transaction.
                </p>
              </div>

              <Link href="/products" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
