"use client";

import { useState, useEffect } from "react";
import styles from "./CreateProductModal.module.css";
import { createClient } from "@/utils/supabase/client";

export default function CreateProductModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const supabase = createClient();

  type Category = { id: string; name: string };
  type Subcategory = { id: string; name: string; category_id: string };
  type Brand = { id: string; name: string };

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image_url: null,
    category_id: "",
    subcategory_id: "",
    brand_id: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newBrand, setNewBrand] = useState("");

  const [catError, setCatError] = useState("");
  const [subError, setSubError] = useState("");
  const [brandError, setBrandError] = useState("");

  const normalize = (s: string) => s.trim().toLowerCase();

  useEffect(() => {
    const fetchData = async () => {
      const { data: cats } = await supabase.from("categories").select("*");
      const { data: brs } = await supabase.from("brands").select("*");
      setCategories(cats || []);
      setBrands(brs || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!formData.category_id) return;

    const fetchSubcategories = async () => {
      const { data: subs } = await supabase
        .from("subcategories")
        .select("*")
        .eq("category_id", formData.category_id);
      setSubcategories(subs || []);
    };
    fetchSubcategories();
  }, [formData.category_id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const createCategory = async () => {
    const name = newCategory.trim();
    if (!name) return;
    setCatError("");

    if (categories.some((c) => normalize(c.name) === normalize(name))) {
      setCatError("Category already exists");
      return;
    }

    const { data: exists } = await supabase
      .from("categories")
      .select("id")
      .eq("name", name)
      .maybeSingle();
    if (exists) {
      setCatError("Category already exists");
      return;
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({ name })
      .select()
      .single();
    if (error) {
      setCatError("Failed to create");
      return;
    }

    setCategories((prev) => [...prev, data!]);
    setFormData((prev) => ({ ...prev, category_id: data!.id }));
    setNewCategory("");
  };

  const createSubcategory = async () => {
    const name = newSubcategory.trim();
    if (!name || !formData.category_id) return;
    setSubError("");

    if (subcategories.some((sc) => normalize(sc.name) === normalize(name))) {
      setSubError("Subcategory already exists");
      return;
    }

    const { data: exists } = await supabase
      .from("subcategories")
      .select("id")
      .eq("name", name)
      .eq("category_id", formData.category_id)
      .maybeSingle();
    if (exists) {
      setSubError("Subcategory already exists");
      return;
    }

    const { data, error } = await supabase
      .from("subcategories")
      .insert({ name, category_id: formData.category_id })
      .select()
      .single();
    if (error) {
      setSubError("Failed to create");
      return;
    }

    setSubcategories((prev) => [...prev, data!]);
    setFormData((prev) => ({ ...prev, subcategory_id: data!.id }));
    setNewSubcategory("");
  };

  const createBrand = async () => {
    const name = newBrand.trim();
    if (!name) return;
    setBrandError("");

    if (brands.some((b) => normalize(b.name) === normalize(name))) {
      setBrandError("Brand already exists");
      return;
    }

    const { data: exists } = await supabase
      .from("brands")
      .select("id")
      .eq("name", name)
      .maybeSingle();
    if (exists) {
      setBrandError("Brand already exists");
      return;
    }

    const { data, error } = await supabase
      .from("brands")
      .insert({ name })
      .select()
      .single();
    if (error) {
      setBrandError("Failed to create");
      return;
    }

    setBrands((prev) => [...prev, data!]);
    setFormData((prev) => ({ ...prev, brand_id: data!.id }));
    setNewBrand("");
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let finalUrl: string | null = null;
    if (file) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}_${formData.title}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, { upsert: false });

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }

      finalUrl = supabase.storage.from("product-images").getPublicUrl(fileName)
        .data.publicUrl;
    }

    const { error } = await supabase.from("products").insert({
      ...formData,
      image_url: finalUrl,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });

    setUploading(false);
    if (error) {
      alert("Error creating product");
      console.error(error);
      return;
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Create New Product</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Product Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
                className={styles.textarea}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Price</label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Stock</label>
                <input
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  type="number"
                  min="0"
                  required
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
              {file && (
                <div className={styles.imagePreviewContainer}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                </div>
              )}
              <p className={styles.fileNote}>
                Recommended size: 800x800px. Max file size: 2MB
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Category</h3>

            <div className={styles.formGroup}>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Select existing category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.orLabel}>Or create a new category:</p>
              <div className={styles.inlineInput}>
                <input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  className={styles.inputSmall}
                />
                <button
                  type="button"
                  onClick={createCategory}
                  className={styles.addButton}
                  disabled={!newCategory.trim()}
                >
                  Add
                </button>
              </div>
              {catError && <p className={styles.error}>{catError}</p>}
            </div>
          </div>

          {formData.category_id && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Subcategory</h3>

              <div className={styles.formGroup}>
                <select
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={handleChange}
                  disabled={!subcategories.length}
                  className={styles.select}
                >
                  <option value="">Select existing subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <p className={styles.orLabel}>Or create a new subcategory:</p>
                <div className={styles.inlineInput}>
                  <input
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    placeholder="Enter new subcategory name"
                    className={styles.inputSmall}
                  />
                  <button
                    type="button"
                    onClick={createSubcategory}
                    className={styles.addButton}
                    disabled={!newSubcategory.trim()}
                  >
                    Add
                  </button>
                </div>
                {subError && <p className={styles.error}>{subError}</p>}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Brand</h3>

            <div className={styles.formGroup}>
              <select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select existing brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.orLabel}>Or create a new brand:</p>
              <div className={styles.inlineInput}>
                <input
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  placeholder="Enter new brand name"
                  className={styles.inputSmall}
                />
                <button
                  type="button"
                  onClick={createBrand}
                  className={styles.addButton}
                  disabled={!newBrand.trim()}
                >
                  Add
                </button>
              </div>
              {brandError && <p className={styles.error}>{brandError}</p>}
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submit}
              disabled={uploading}
            >
              {uploading ? (
                <span className={styles.loadingText}>
                  <span className={styles.spinner}></span>Uploading…
                </span>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
