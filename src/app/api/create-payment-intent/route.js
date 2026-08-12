import Stripe from "stripe";
import { NextResponse } from "next/server";
import { buildOrderItems } from "../../lib/cart";

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
  });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { items } = body || {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { orderItems, total, error } = buildOrderItems(items, baseUrl);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const orderNumber = `HH-${Date.now().toString().slice(-8)}`;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: "usd",
    payment_method_types: ["card"],
    metadata: {
      order_number: orderNumber,
      items: JSON.stringify(orderItems),
      total: total.toFixed(2),
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret, orderNumber });
}
