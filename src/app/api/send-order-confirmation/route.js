import nodemailer from "nodemailer";

const PAYMENT_LABELS = {
  card: "Credit / Debit Card",
  paypal: "PayPal",
  cod: "Cash on Delivery",
};

export async function POST(request) {
  const body = await request.json();
  const { orderNumber, customer, shipping, paymentType, items, total } = body ?? {};

  if (!customer?.email || !orderNumber || !Array.isArray(items)) {
    return Response.json({ sent: false, reason: "invalid_payload" }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, SMTP_FROM_EMAIL, SMTP_FROM_NAME } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.warn("SMTP is not configured — skipping order confirmation email.");
    return Response.json({ sent: false, reason: "smtp_not_configured" });
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
      <p style="color:#3f3f46;margin-top:4px;">${PAYMENT_LABELS[paymentType] || paymentType}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${SMTP_FROM_NAME || "HoodiesHome"}" <${SMTP_FROM_EMAIL || SMTP_USER}>`,
      to: customer.email,
      bcc: process.env.ADMIN_EMAIL || undefined,
      subject: `Order Confirmed — ${orderNumber}`,
      html,
    });
    return Response.json({ sent: true });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return Response.json({ sent: false, reason: "send_failed" });
  }
}
