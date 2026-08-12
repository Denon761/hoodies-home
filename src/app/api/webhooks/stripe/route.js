import Stripe from "stripe";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-04-30.basil",
  });
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderNumber = paymentIntent.metadata?.order_number || `HH-${Date.now().toString().slice(-8)}`;
    const items = JSON.parse(paymentIntent.metadata?.items || "[]");
    const total = paymentIntent.metadata?.total || (paymentIntent.amount / 100).toFixed(2);

    const shippingInfo = paymentIntent.shipping || {};
    const customer = {
      fullName: shippingInfo.name || "",
      email: paymentIntent.receipt_email || "",
      phone: shippingInfo.phone || "",
    };
    const shipping = {
      address: shippingInfo.address?.line1 || "",
      city: shippingInfo.address?.city || "",
      state: shippingInfo.address?.state || "",
      zip: shippingInfo.address?.postal_code || "",
    };

    await sendOrderConfirmation({ orderNumber, customer, shipping, items, total });
  }

  return NextResponse.json({ received: true });
}

async function sendOrderConfirmation({ orderNumber, customer, shipping, items, total }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, SMTP_FROM_EMAIL, SMTP_FROM_NAME, ADMIN_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.warn("SMTP is not configured — skipping order confirmation email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e7e7ea;">${item.name} (${item.variantName} / ${item.size}) × ${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e7e7ea;text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#0a0a0a;">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#71717a;">HoodiesHome</p>
      <h1 style="font-size:22px;margin:8px 0;">Order Confirmed</h1>
      <p style="color:#3f3f46;">Thanks ${customer.fullName || "for your order"}! Your order
        <strong>${orderNumber}</strong> has been placed.</p>

      <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:14px;">
        ${itemRows}
        <tr>
          <td style="padding-top:12px;font-weight:bold;">Total</td>
          <td style="padding-top:12px;text-align:right;font-weight:bold;">$${Number(total).toFixed(2)}</td>
        </tr>
      </table>

      <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;margin-top:28px;">Shipping To</h2>
      <p style="color:#3f3f46;margin-top:4px;">
        ${customer.fullName}<br />
        ${shipping?.address}<br />
        ${shipping?.city}, ${shipping?.state} ${shipping?.zip}
      </p>

      <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;margin-top:20px;">Payment</h2>
      <p style="color:#3f3f46;margin-top:4px;">Credit / Debit Card (Stripe)</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${SMTP_FROM_NAME || "HoodiesHome"}" <${SMTP_FROM_EMAIL || SMTP_USER}>`,
      to: customer.email,
      bcc: ADMIN_EMAIL || undefined,
      subject: `Order Confirmed — ${orderNumber}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}
