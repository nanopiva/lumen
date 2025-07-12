import { createClient } from "@/utils/supabase/server";

const PAGE_SIZE = 6;

export async function getProducts(page = 1) {
  const supabase = await createClient();

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: products,
    count,
    error,
  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    console.error("Error fetching products:", error.message);
    return { products: [], totalCount: 0 };
  }

  return { products, totalCount: count || 0 };
}
