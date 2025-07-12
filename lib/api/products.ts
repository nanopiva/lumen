import { Product } from "../types";

type GetProductsArgs = {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  cursor?: string | null;
};

export async function fetchFilteredProducts({
  category,
  subcategory,
  brand,
  minPrice,
  maxPrice,
  cursor,
}: GetProductsArgs): Promise<{
  products: Product[];
  nextCursor: string | null;
}> {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (subcategory) params.append("subcategory", subcategory);
  if (brand) params.append("brand", brand);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  if (cursor) params.append("cursor", cursor);

  const response = await fetch(`/api/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Error al cargar productos");
  }

  return response.json();
}
