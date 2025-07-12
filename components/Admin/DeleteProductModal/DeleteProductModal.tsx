"use client";

import styles from "./DeleteProductModal.module.css";

type Props = {
  productTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteProductModal({
  productTitle,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Delete Product</h2>
        <p>
          Are you sure you want to delete <strong>{productTitle}</strong>? This
          action cannot be undone.
        </p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
