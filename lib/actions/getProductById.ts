import { createClient } from "@/utils/supabase/server";

export default async function getProductById(productId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !data) return null;

  return data;
}
