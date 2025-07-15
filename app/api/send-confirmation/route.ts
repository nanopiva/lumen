import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import OrderConfirmationEmail from "@/app/emails/OrderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { customer, order } = await req.json();

  try {
    await resend.emails.send({
      from: "Lumen order <orderLumen@nanop.com.ar>",
      to: customer.email,
      subject: `Order #${order.id} confirmed!`,
      react: OrderConfirmationEmail({
        customerName: customer.name,
        orderId: order.id,
        items: order.items,
        total: order.total,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
