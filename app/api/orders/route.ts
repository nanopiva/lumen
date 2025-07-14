import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type CartItem = { productId: string; price: number; quantity: number };

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    customer_name,
    customer_email,
    customer_address,
    customer_notes,
    items,
  }: {
    customer_name: string;
    customer_email: string;
    customer_address: string;
    customer_notes?: string;
    items: CartItem[];
  } = await req.json();

  if (!items?.length) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  // Verificar stock actual
  const ids = items.map((i) => i.productId);
  const { data: productRows, error: stockErr } = await supabase
    .from("products")
    .select("id, stock")
    .in("id", ids);

  if (stockErr) {
    return NextResponse.json(
      { error: "Failed to fetch stock" },
      { status: 500 }
    );
  }

  const stockMap: Record<string, number> = {};
  productRows?.forEach((p) => (stockMap[p.id] = p.stock));

  const insufficient = items.filter(
    (i) => i.quantity > (stockMap[i.productId] ?? 0)
  );

  if (insufficient.length) {
    return NextResponse.json(
      { error: "Insufficient stock", details: insufficient },
      { status: 409 }
    );
  }

  // Crear orden
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user?.id ?? null,
        total_amount: totalAmount,
        notes: customer_notes,
        customer_name,
        customer_email,
        customer_address,
      },
    ])
    .select()
    .single();

  if (orderErr || !order) {
    return NextResponse.json(
      { error: "Failed to create order", details: orderErr?.message },
      { status: 500 }
    );
  }

  // Insertar ítems de la orden
  const orderItems = items.map((i) => ({
    order_id: order.id,
    product_id: i.productId,
    quantity: i.quantity,
    unit_price: i.price,
  }));

  const { error: itemsErr } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsErr) {
    return NextResponse.json(
      { error: "Failed to create order items", details: itemsErr.message },
      { status: 500 }
    );
  }

  // Restar stock
  await Promise.all(
    items.map((i) =>
      supabase
        .from("products")
        .update({ stock: stockMap[i.productId] - i.quantity })
        .eq("id", i.productId)
    )
  );

  // Enviar email de confirmación
  try {
    const origin = new URL(req.url).origin;

    await fetch(`${origin}/api/send-confirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: { name: customer_name, email: customer_email },
        order: { id: order.id, items, total: totalAmount },
      }),
    });
  } catch (mailErr) {
    console.error("Failed to send confirmation email:", mailErr);
  }

  return NextResponse.json({ success: true, orderId: order.id });
}
