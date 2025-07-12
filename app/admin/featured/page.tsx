import { createClient } from "@/utils/supabase/server";
import FeaturedManager from "@/components/Admin/FeaturedManager/FeaturedManager";
import { Product } from "@/components/ProductsPage/ProductsFeed/ProductsFeed";

export default async function FeaturedAdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, title, price, image_url, is_featured
    `
    )
    .limit(100);

  if (error) {
    return (
      <p style={{ color: "red" }}>Failed to load products: {error.message}</p>
    );
  }

  return (
    <FeaturedManager
      products={
        data as Pick<Product, "id" | "title" | "image_url" | "is_featured">[]
      }
    />
  );
}
