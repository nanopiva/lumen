"use client";

import Link from "next/link";
import styles from "./ProductCardClient.module.css";
import { Product } from "../ProductsFeed/ProductsFeed";
import { ProductFormValues } from "@/components/Admin/EditProductModal/EditProductModal";
import { Pencil, Trash, RotateCcw } from "lucide-react";
import { useState, MouseEvent } from "react";
import EditProductModal from "@/components/Admin/EditProductModal/EditProductModal";
import DeleteProductModal from "@/components/Admin/DeleteProductModal/DeleteProductModal";
import RestoreProductModal from "@/components/Admin/RestoreProductModal/RestoreProductModal";

type Props = {
  product: Product;
  adminMode?: boolean;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
};

export default function ProductCardClient({
  product,
  adminMode = false,
  onDelete,
  onRestore,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  const outOfStock = product.stock === 0;
  const isDeleted = product.is_deleted;

  const stop = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete product.");
        return;
      }
      onDelete?.(product.id);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Unexpected error deleting product.");
    }
  };

  return (
    <>
      <Link
        href={`/products/${product.id}`}
        className={`${styles.card} ${isDeleted ? styles.deleted : ""}`}
      >
        {adminMode && (
          <div className={styles.adminActions}>
            {isDeleted ? (
              <button
                onClick={(e) => {
                  stop(e);
                  setIsRestoreModalOpen(true);
                }}
                className={styles.restoreButton}
                title="Restore product"
              >
                <RotateCcw size={16} />
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    stop(e);
                    setIsEditModalOpen(true);
                  }}
                  className={styles.iconButton}
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={(e) => {
                    stop(e);
                    setIsDeleteModalOpen(true);
                  }}
                  className={styles.iconButton}
                  title="Delete"
                >
                  <Trash size={16} />
                </button>
              </>
            )}
          </div>
        )}

        {isDeleted && (
          <div className={styles.deletedOverlay}>
            <div className={styles.deletedBadge}>DELETED</div>
            {adminMode && (
              <div className={styles.deletedDate}>
                {product.deleted_at
                  ? new Date(product.deleted_at).toLocaleDateString()
                  : ""}
              </div>
            )}
          </div>
        )}

        <div className={styles.contentWrapper}>
          <img
            src={product.image_url || "/placeholder.png"}
            alt={product.title}
            className={`${styles.image} ${isDeleted ? styles.grayscale : ""} ${
              !product.image_url ? styles.placeholderImage : ""
            }`}
          />

          <div className={styles.content}>
            <p
              className={`${styles.title} ${isDeleted ? styles.deletedTitle : ""}`}
            >
              {product.title}
            </p>

            {product.brand && (
              <p
                className={`${styles.brand} ${isDeleted ? styles.deletedText : ""}`}
              >
                {product.brand.name}
              </p>
            )}

            <p
              className={`${styles.price} ${isDeleted ? styles.deletedText : ""}`}
            >
              ${product.price.toFixed(2)}
            </p>

            {!isDeleted && (
              <>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.stock}>
                  {outOfStock ? "Out of stock" : `Stock: ${product.stock}`}
                </p>
              </>
            )}
          </div>
        </div>
      </Link>

      {isEditModalOpen && (
        <EditProductModal
          product={product}
          onClose={() => setIsEditModalOpen(false)}
          onSave={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteProductModal
          productTitle={product.title}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {isRestoreModalOpen && (
        <RestoreProductModal
          product={product}
          onClose={() => setIsRestoreModalOpen(false)}
          onRestore={(updated: ProductFormValues) => {
            onRestore?.(updated.id);
            setIsRestoreModalOpen(false);
          }}
        />
      )}
    </>
  );
}
