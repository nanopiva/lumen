import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, title, price, image_url, description, stock,
      brand_id, category_id, subcategory_id, is_featured,
      brand:brand_id (id,name),
      category:category_id (id,name),
      subcategory:subcategory_id (id,name)
    `
    )
    .eq("is_featured", true)
    .eq("is_deleted", false)
    .gt("stock", 0)
    .limit(8);

  if (error) {
    console.error("Featured fetch error:", error.message);
    // always returns an array so as not to break the client
    return NextResponse.json([], { status: 200 });
  }

  return NextResponse.json(data ?? [], { status: 200 });
}
