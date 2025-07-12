import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const search = searchParams.get("search") || undefined;
  const featured = searchParams.get("featured") === "true";

  const includeOutOfStock = searchParams.get("includeOutOfStock") === "true";
  const includeDeleted = searchParams.get("includeDeleted") === "true";

  let query = supabase
    .from("products")
    .select(
      `
      id,
      title,
      price,
      image_url,
      description,
      stock,
      is_deleted,
      brand_id,
      category_id,
      subcategory_id,
      brand:brand_id        (id, name),
      category:category_id  (id, name),
      subcategory:subcategory_id (id, name)
    `
    )
    .range(offset, offset + limit - 1);

  if (!includeDeleted) query = query.eq("is_deleted", false);
  if (!includeOutOfStock) query = query.gt("stock", 0);

  if (!includeOutOfStock) query = query.gt("stock", 0);
  if (category) query = query.eq("category_id", category);
  if (subcategory) query = query.eq("subcategory_id", subcategory);
  if (brand) query = query.eq("brand_id", brand);
  if (minPrice) query = query.gte("price", parseFloat(minPrice));
  if (maxPrice) query = query.lte("price", parseFloat(maxPrice));
  if (search) query = query.ilike("title", `%${search}%`);
  if (featured) query = query.eq("is_featured", true);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
