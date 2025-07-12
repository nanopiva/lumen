"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trash } from "lucide-react";
import TaxonomyForm from "../TaxonomyForm/TaxonomyForm";
import styles from "./TaxonomyList.module.css";

type TaxonomyType = "category" | "subcategory" | "brand";

interface Props {
  type: TaxonomyType;
  title: string;
}

interface TaxonomyItem {
  id: string;
  name: string;
}

const TABLE_NAME: Record<TaxonomyType, string> = {
  category: "categories",
  subcategory: "subcategories",
  brand: "brands",
};

export default function TaxonomyList({ type, title }: Props) {
  const supabase = createClient();
  const [items, setItems] = useState<TaxonomyItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from(TABLE_NAME[type])
      .select("id, name")
      .order("name", { ascending: true });

    if (!error && data) setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase
      .from(TABLE_NAME[type])
      .delete()
      .eq("id", id);

    if (error) {
      alert("Could not delete. Make sure no products depend on it.");
    } else {
      fetchItems();
    }
    setDeletingId(null);
    setConfirmId(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.countBadge}>{items.length} items</span>
        </div>

        {items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <span className={styles.itemName}>{item.name}</span>
                <button
                  onClick={() => setConfirmId(item.id)}
                  disabled={deletingId !== null}
                  className={styles.deleteButton}
                  aria-label={`Delete ${item.name}`}
                >
                  {deletingId === item.id ? (
                    <div className={styles.loader} />
                  ) : (
                    <Trash size={16} className={styles.trashIcon} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={styles.emptyIcon}
            >
              <path d="M3 3h18v18H3z" />
              <path d="M8 8h8v8H8z" />
            </svg>
            <p>No {type}s found</p>
          </div>
        )}

        <div className={styles.formWrapper}>
          <TaxonomyForm type={type} onSuccess={fetchItems} />
        </div>
      </div>

      {confirmId && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Delete {type}</h3>
            <p className={styles.modalText}>
              Are you sure you want to delete this {type}? <br />
              This action cannot be undone.
            </p>

            <div className={styles.modalActions}>
              <button
                onClick={() => setConfirmId(null)}
                className={styles.modalCancel}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className={styles.modalConfirm}
                disabled={deletingId !== null}
              >
                {deletingId ? <div className={styles.loaderWhite} /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
