"use client";

import { useEffect, useState } from "react";
import styles from "../EditProductModal/EditProductModal.module.css";
import { createClient } from "@/utils/supabase/client";

export type ProductFormValues = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  stock: number;
  category_id: string | null;
  subcategory_id: string | null;
  brand_id: string | null;
};

type FilterOption = { id: string; name: string };

type Props = {
  product: ProductFormValues;
  onClose: () => void;
  onRestore?: (updated: ProductFormValues) => void;
};

const BUCKET = "product-images";

function bucketPathFromPublicUrl(url: string): string {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  return idx === -1 ? "" : url.slice(idx + marker.length);
}

export default function RestoreProductModal({
  product,
  onClose,
  onRestore,
}: Props) {
  const supabase = createClient();

  const [form, setForm] = useState<ProductFormValues>({
    ...product,
    category_id: product.category_id ?? "",
    subcategory_id: product.subcategory_id ?? "",
    brand_id: product.brand_id ?? "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [subcategories, setSubcategories] = useState<FilterOption[]>([]);
  const [brands, setBrands] = useState<FilterOption[]>([]);

  useEffect(() => {
    fetch("/api/filters")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
        setSubcategories(data.subcategories);
        setBrands(data.brands);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? Number(value) : value || null,
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleRestore = async () => {
    setUploading(true);
    let finalUrl: string | null = form.image_url || null;

    if (file) {
      if (form.image_url) {
        const oldPath = bucketPathFromPublicUrl(form.image_url);
        if (oldPath) {
          const { error: removeErr } = await supabase.storage
            .from(BUCKET)
            .remove([oldPath]);
          if (removeErr)
            console.warn("Failed to delete old image:", removeErr.message);
        }
      }

      const ext = file.name.split(".").pop();
      const safeTitle = form.title.replace(/[^a-z0-9_\-]/gi, "_");
      const fileName = `${Date.now()}_${safeTitle}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { upsert: false });

      if (uploadErr) {
        alert("Image upload failed: " + uploadErr.message);
        setUploading(false);
        return;
      }

      finalUrl = supabase.storage.from(BUCKET).getPublicUrl(fileName)
        .data.publicUrl;
    }

    try {
      const res = await fetch(`/api/products/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image_url: finalUrl,
          is_deleted: false,
          deleted_at: null,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        console.error("Error restoring product:", error);
        alert("Failed to restore product.");
        setUploading(false);
        return;
      }

      onRestore?.({ ...form, image_url: finalUrl });
      onClose();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error restoring product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Restore Product</h2>

        <div className={styles.form}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min={0}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min={0}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Product Image</h3>
            <div className={styles.formGroup}>
              <label className={styles.fileUploadLabel}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className={styles.fileInput}
                />
                <span className={styles.fileUploadButton}>
                  {file ? "Change Image" : "Select Image"}
                </span>
                {file && <span className={styles.fileName}>{file.name}</span>}
              </label>

              {(file || form.image_url) && (
                <div className={styles.imagePreviewContainer}>
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : form.image_url || "/placeholder.png"
                    }
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                </div>
              )}

              <p className={styles.fileNote}>
                Recommended size: 800×800px • Max: 2MB
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Classification</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                name="category_id"
                value={form.category_id ?? ""}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Subcategory</label>
              <select
                name="subcategory_id"
                value={form.subcategory_id ?? ""}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">None</option>
                {subcategories.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Brand</label>
              <select
                name="brand_id"
                value={form.brand_id ?? ""}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">None</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancel}
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            className={styles.save}
            onClick={handleRestore}
            disabled={uploading}
          >
            {uploading ? (
              <span className={styles.loadingText}>
                <span className={styles.spinner}></span>Restoring…
              </span>
            ) : (
              "Restore Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
