"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { createClient } from "@/utils/supabase/client";

type Order = {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_address: string | null;
  notes: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  items: {
    id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product: {
      title: string;
    } | null;
  }[];
};

type RawOrder = {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_address: string | null;
  notes: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  order_items: {
    id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product: { title: string } | null;
  }[];
};

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          created_at,
          customer_name,
          customer_email,
          customer_address,
          notes,
          total_amount,
          status,
          payment_status,
          order_items (
            id,
            quantity,
            unit_price,
            total_price,
            product:product_id (
              title
            )
          )
        `
        )
        .order("created_at", { ascending: false });

      if (!error && data) {
        const formatted: Order[] = (data as unknown as RawOrder[]).map(
          (order) => ({
            ...order,
            items: order.order_items.map((item) => ({
              ...item,
              product: item.product ?? null,
            })),
          })
        );
        setOrders(formatted);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Order Management</h1>
          <div className={styles.stats}>
            <span className={styles.statItem}>
              <strong>{orders.length}</strong> orders
            </span>
            <span className={styles.statItem}>
              <strong>
                $
                {orders
                  .reduce((acc, order) => acc + order.total_amount, 0)
                  .toFixed(2)}
              </strong>{" "}
              total
            </span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No orders found</p>
          </div>
        ) : (
          <div className={styles.ordersGrid}>
            {orders.map((order) => {
              const orderDate = new Date(order.created_at);
              const formattedDate = orderDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const formattedTime = orderDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderMeta}>
                      <span className={styles.orderId}>
                        #{order.id.slice(0, 8)}
                      </span>
                      <div className={styles.orderDateTime}>
                        <span className={styles.orderDate}>
                          {formattedDate}
                        </span>
                        <span className={styles.orderTime}>
                          {formattedTime}
                        </span>
                      </div>
                    </div>
                    <div className={styles.statusContainer}>
                      <div
                        className={`${styles.statusPill} ${
                          styles[order.status.toLowerCase()]
                        }`}
                      >
                        {order.status}
                      </div>
                      <div
                        className={`${styles.paymentPill} ${
                          styles[order.payment_status.toLowerCase()]
                        }`}
                      >
                        {order.payment_status}
                      </div>
                    </div>
                  </div>

                  <div className={styles.customerInfo}>
                    <div className={styles.customerName}>
                      {order.customer_name || "Anonymous Customer"}
                    </div>
                    <div className={styles.customerEmail}>
                      {order.customer_email || "No email provided"}
                    </div>

                    {order.customer_address && (
                      <div className={styles.customerAddress}>
                        <svg
                          className={styles.addressIcon}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{order.customer_address}</span>
                      </div>
                    )}

                    {order.notes && (
                      <div className={styles.customerNotes}>
                        <svg
                          className={styles.notesIcon}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span>{order.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.orderTotal}>
                    ${order.total_amount.toFixed(2)}
                  </div>

                  <details className={styles.orderDetails}>
                    <summary className={styles.detailsToggle}>
                      <span>View Items</span>
                    </summary>
                    <div className={styles.detailsContent}>
                      <h4>Order Items</h4>
                      <ul className={styles.itemsList}>
                        {order.items.map((item) => (
                          <li key={item.id} className={styles.item}>
                            <div className={styles.itemName}>
                              {item.product?.title ?? "(Deleted Product)"}
                            </div>
                            <div className={styles.itemDetails}>
                              <span className={styles.itemQuantity}>
                                ×{item.quantity}
                              </span>
                              <span className={styles.itemPrice}>
                                ${item.total_price.toFixed(2)}
                                <span className={styles.unitPrice}>
                                  (${item.unit_price.toFixed(2)}/ea)
                                </span>
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
