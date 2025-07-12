"use client";

import { useCart } from "@/components/CartContext";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setShowLoader(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_address: formData.address,
          customer_notes: formData.notes,
          items,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to process order");
      }

      const result = await res.json();
      clearCart();
      router.push(`/thank-you?orderId=${result.orderId}`);
    } catch (error) {
      setShowLoader(false);
      alert(
        error instanceof Error
          ? error.message
          : "There was an error processing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (showLoader) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loaderContainer}>
          <div className="loader" role="status" aria-label="Processing order" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <section className={styles.emptyCart}>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>There is nothing to checkout yet.</p>
          <button
            onClick={() => router.push("/products")}
            className={styles.continueShopping}
          >
            Browse Products
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.checkoutContainer}>
        <div className={styles.checkoutHeader}>
          <h1 className={styles.title}>Checkout</h1>
          <p className={styles.itemsCount}>
            {items.length} {items.length === 1 ? "item" : "items"} in your order
          </p>
        </div>

        <div className={styles.disclaimerBanner}>
          <p>
            <strong>Demo Notice:</strong> This is a simulation only. No real
            purchase will be made.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Customer Information</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.inputLabel}>
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Shipping Details</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="address" className={styles.inputLabel}>
                Shipping Address <span className={styles.required}>*</span>
              </label>
              <textarea
                id="address"
                name="address"
                className={`${styles.inputField} ${styles.textarea}`}
                rows={4}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Additional Information</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="notes" className={styles.inputLabel}>
                Order Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                className={`${styles.inputField} ${styles.textarea}`}
                rows={3}
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.productId} className={styles.itemRow}>
                  <span className={styles.itemName}>
                    {item.title}{" "}
                    <span className={styles.itemQuantity}>
                      ×{item.quantity}
                    </span>
                  </span>
                  <span className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.submitSection}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Purchase"}
            </button>
            <p className={styles.demoNotice}>
              This is a simulation only. No real payment will be processed.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
