"use client";

import { useEffect, useState } from "react";
import styles from "./FiltersSidebar.module.css";

export type FilterOption = {
  id: string;
  name: string;
};

export type Filters = {
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  showDeleted?: boolean;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  isAdmin?: boolean;
};

export default function FiltersSidebar({
  filters,
  onChange,
  isAdmin = false,
}: Props) {
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [subcategories, setSubcategories] = useState<FilterOption[]>([]);
  const [brands, setBrands] = useState<FilterOption[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [localPrice, setLocalPrice] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await fetch("/api/filters");
        const data = await res.json();

        const min = 0;
        const max = Math.ceil((data?.maxPrice ?? 1000) * 100) / 100;

        setCategories(data.categories ?? []);
        setSubcategories(data.subcategories ?? []);
        setBrands(data.brands ?? []);
        setPriceRange([min, max]);
        setLocalPrice([min, max]);
      } catch (err) {
        console.error("Error loading filters", err);
        setCategories([]);
        setSubcategories([]);
        setBrands([]);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.sliderTrack}`
    ) as HTMLElement;
    if (slider) {
      slider.style.setProperty("--min", localPrice[0].toString());
      slider.style.setProperty("--max", localPrice[1].toString());
      slider.style.setProperty("--min-range", priceRange[0].toString());
      slider.style.setProperty("--max-range", priceRange[1].toString());
    }
  }, [localPrice, priceRange]);

  useEffect(() => {
    if (filters.category) {
      fetch(`/api/filters?category=${filters.category}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data.subcategories))
        .catch(console.error);
    }
  }, [filters.category]);

  const handleChange = (
    key: keyof Filters,
    value: string | number | boolean
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (values: [number, number]) => {
    setLocalPrice(values);
    onChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Filters</h2>

      {isAdmin && (
        <div className={styles.filterGroup}>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabelText}>
              Show deleted products
            </label>
            <label className={styles.toggleContainer}>
              <input
                type="checkbox"
                checked={!!filters.showDeleted}
                onChange={(e) => handleChange("showDeleted", e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>
      )}

      <div className={styles.filterGroup}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="subcategory">Subcategory</label>
        <select
          id="subcategory"
          value={filters.subcategory || ""}
          onChange={(e) => handleChange("subcategory", e.target.value)}
          disabled={!filters.category}
        >
          <option value="">All subcategories</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="brand">Brand</label>
        <select
          id="brand"
          value={filters.brand || ""}
          onChange={(e) => handleChange("brand", e.target.value)}
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Price range</label>
        <div className={styles.rangeSliderContainer}>
          <div className={styles.rangeValues}>
            <span>${localPrice[0]}</span>
            <span>${localPrice[1]}</span>
          </div>
          <div className={styles.slider}>
            <div className={styles.sliderTrack}></div>
            <input
              type="range"
              min={priceRange[0]}
              max={priceRange[1]}
              step={0.01}
              value={localPrice[0]}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), localPrice[1]);
                handlePriceChange([value, localPrice[1]]);
              }}
              className={styles.sliderThumb}
            />
            <input
              type="range"
              min={priceRange[0]}
              max={priceRange[1]}
              step={0.01}
              value={localPrice[1]}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), localPrice[0]);
                handlePriceChange([localPrice[0], value]);
              }}
              className={styles.sliderThumb}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
