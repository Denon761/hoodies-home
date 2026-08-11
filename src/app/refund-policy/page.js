import PolicyLayout from "../components/PolicyLayout";

export const metadata = { title: "Refund Policy | HoodiesHome" };

const SECTIONS = [
  {
    icon: "ShieldCheck",
    title: "30-Day Guarantee",
    body: "Every order is backed by our 30-day guarantee. If your hoodie arrives damaged, defective, or the wrong item, we'll replace it or refund you in full — no questions asked.",
  },
  {
    icon: "RotateCcw",
    title: "Change of Mind Returns",
    body: "Unworn, unwashed items in original condition can be returned within 30 days of delivery for a full refund.",
  },
  {
    icon: "ClipboardList",
    title: "How to Request a Refund",
    list: [
      "Contact support within 30 days of delivery with your order number.",
      "Include photos of the issue for defective or incorrect items.",
      "Approved refunds are issued to your original payment method within 5–10 business days.",
    ],
  },
  {
    icon: "Truck",
    title: "Return Shipping",
    body: "Return shipping is free for defective or incorrect items. For change-of-mind returns, a small return shipping fee may be deducted from your refund.",
  },
  {
    icon: "Repeat",
    title: "Exchanges",
    body: "Want a different color? Request an exchange instead of a refund and we'll ship the replacement as soon as the original item is on its way back to us.",
  },
  {
    icon: "XCircle",
    title: "Cancellations",
    body: "Orders can be cancelled or edited free of charge before they ship. Once an order has shipped, it falls under our standard return policy above.",
  },
];

export default function RefundPolicyPage() {
  return <PolicyLayout title="Refund Policy" updated="August 9, 2026" sections={SECTIONS} />;
}
