"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import styles from "./TaxonomyForm.module.css";

type TaxonomyType = "category" | "subcategory" | "brand";

interface Props {
  type: TaxonomyType;
  onSuccess: () => void;
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

export default function TaxonomyForm({ type, onSuccess }: Props) {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<TaxonomyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (type !== "subcategory") return;

    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name")
        .order("name", { ascending: true });
      if (data) setCategories(data);
    };

    fetchCategories();
  }, [type, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const table = TABLE_NAME[type];

    if (type === "brand") {
      const { data: dup } = await supabase
        .from(table)
        .select("id")
        .ilike("name", name.trim());

      if (dup?.length) {
        setLoading(false);
        setErrorMsg("That brand already exists.");
        return;
      }
    }

    const payload =
      type === "subcategory" ? { name, category_id: categoryId } : { name };
    const { error } = await supabase.from(table).insert(payload);

    if (error?.code === "23505") {
      setErrorMsg(`That ${type} already exists.`);
    } else if (!error) {
      setName("");
      setCategoryId("");
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} name`}
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        {type === "subcategory" && (
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={styles.select}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? (
          <span className={styles.loadingText}>
            <div className="loader"></div>
            Creating...
          </span>
        ) : (
          `Create ${type}`
        )}
      </button>

      {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
    </form>
  );
}
