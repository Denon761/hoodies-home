import PolicyLayout from "../components/PolicyLayout";

export const metadata = {
  title: "Refund Policy",
  description: "HoodiesHome's 7-day refund, return, and exchange policy.",
};

const SECTIONS = [
  {
    icon: "ShieldCheck",
    title: "7-Day Guarantee",
    body: "Every order is backed by our 7-day guarantee. If your hoodie arrives damaged, defective, or the wrong item, we'll replace it or refund you in full — no questions asked.",
  },
  {
    icon: "RotateCcw",
    title: "Change of Mind Returns",
    body: "Unworn, unwashed items in original condition can be returned within 7 days of delivery for a full refund.",
  },
  {
    icon: "Repeat",
    title: "Size Exchanges",
    body: "Ordered the wrong size? Request a size exchange within 7 days of delivery and we'll ship the correct size as soon as the original item is on its way back to us, subject to stock availability.",
  },
  {
    icon: "Shirt",
    title: "Color & Style Exchanges",
    body: "Want a different color or style instead? Request an exchange in place of a refund within 7 days of delivery and we'll send the replacement once the original item is on its way back to us.",
  },
  {
    icon: "ClipboardList",
    title: "How to Request a Refund or Exchange",
    list: [
      "Contact support within 7 days of delivery with your order number.",
      "Let us know if you'd like a refund, a size exchange, or a color/style exchange.",
      "Include photos of the issue for defective or incorrect items.",
      "Approved refunds are issued to your original payment method within 5–10 business days.",
    ],
  },
  {
    icon: "Truck",
    title: "Return Shipping",
    body: "Return shipping is free for defective or incorrect items, and for size or style exchanges. For change-of-mind returns, a small return shipping fee may be deducted from your refund.",
  },
  {
    icon: "XCircle",
    title: "Cancellations",
    body: "Orders can be cancelled or edited free of charge before they ship. Once an order has shipped, it falls under our standard return policy above.",
  },
];

export default function RefundPolicyPage() {
  return <PolicyLayout title="Refund Policy" updated="August 16, 2026" sections={SECTIONS} />;
}
