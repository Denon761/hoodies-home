import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
  });
  let items;
  let total;
  try {
    const body = await request.json();
    items = body?.items;
    total = body?.total;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "IN"],
    },
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: `${item.variantName} / ${item.size}`,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/cancel`,
    metadata: {
      order_number: `HH-${Date.now().toString().slice(-8)}`,
      items: JSON.stringify(
        items.map((item) => ({
          id: item.id,
          name: item.name,
          variantName: item.variantName,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }))
      ),
      total: total ? total.toFixed(2) : "0.00",
    },
  });

  return NextResponse.json({ url: session.url });
}
