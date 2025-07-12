import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type ProductUpdate = {
  title?: string;
  description?: string;
  price?: number;
  image_url?: string;
  stock?: number;
  category_id?: string | null;
  subcategory_id?: string | null;
  brand_id?: string | null;
  is_featured?: boolean;
  is_deleted?: boolean;
  deleted_at?: string | null;
};

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = context.params;
  const body = await request.json();

  const {
    title,
    description,
    price,
    image_url,
    stock,
    category_id,
    subcategory_id,
    brand_id,
    is_featured,
    is_deleted,
    deleted_at,
  } = body;

  const updateData: ProductUpdate = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price }),
    ...(image_url !== undefined && { image_url }),
    ...(stock !== undefined && { stock }),
    ...(category_id !== undefined && { category_id: category_id || null }),
    ...(subcategory_id !== undefined && {
      subcategory_id: subcategory_id || null,
    }),
    ...(brand_id !== undefined && { brand_id: brand_id || null }),
    ...(is_featured !== undefined && { is_featured }),
    ...(is_deleted !== undefined && { is_deleted }),
    ...(deleted_at !== undefined && { deleted_at }),
  };

  const { error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating product:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = context.params;

  const { error } = await supabase
    .from("products")
    .update({
      is_deleted: true,
      deleted_at: new Date().toISOString(),
      stock: 0,
      is_featured: false,
    })
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
