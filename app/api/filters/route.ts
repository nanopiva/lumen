import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;
  const brand = searchParams.get("brand") || undefined;

  // Obtener productos con stock
  let baseQuery = supabase
    .from("products")
    .select("id, price, category_id, subcategory_id, brand_id")
    .gt("stock", 0)
    .eq("is_deleted", false);

  if (category) baseQuery = baseQuery.eq("category_id", category);
  if (subcategory) baseQuery = baseQuery.eq("subcategory_id", subcategory);
  if (brand) baseQuery = baseQuery.eq("brand_id", brand);

  const { data: products, error } = await baseQuery;

  if (error) {
    console.error("Error fetching products for filters:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Extraer IDs únicos y calcular rango de precios
  const categoryIds = Array.from(
    new Set(products.map((p) => p.category_id).filter(Boolean))
  );
  const subcategoryIds = Array.from(
    new Set(products.map((p) => p.subcategory_id).filter(Boolean))
  );
  const brandIds = Array.from(
    new Set(products.map((p) => p.brand_id).filter(Boolean))
  );

  const prices = products.map((p) => Number(p.price));
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  const [catRes, subcatRes, brandRes] = await Promise.all([
    supabase.from("categories").select("id, name").in("id", categoryIds),
    supabase.from("subcategories").select("id, name").in("id", subcategoryIds),
    supabase.from("brands").select("id, name").in("id", brandIds),
  ]);

  if (catRes.error || subcatRes.error || brandRes.error) {
    return NextResponse.json(
      {
        error:
          catRes.error?.message ||
          subcatRes.error?.message ||
          brandRes.error?.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    categories: catRes.data,
    subcategories: subcatRes.data,
    brands: brandRes.data,
    minPrice,
    maxPrice,
  });
}
