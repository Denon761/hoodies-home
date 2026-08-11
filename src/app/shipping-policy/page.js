import PolicyLayout from "../components/PolicyLayout";

export const metadata = { title: "Shipping Policy | HoodiesHome" };

const SECTIONS = [
  {
    icon: "Package",
    title: "Processing Time",
    body: "Orders are processed and packed within 1–2 business days of purchase. You'll get a confirmation email the moment your order is placed.",
  },
  {
    icon: "Truck",
    title: "Shipping Time",
    body: "Standard shipping within the USA takes 2–3 business days after processing. You'll receive a tracking number by email as soon as your order ships.",
  },
  {
    icon: "Gift",
    title: "Free Shipping",
    body: "All orders ship free within the USA — no minimum spend required.",
  },
  {
    icon: "MapPin",
    title: "Where We Ship",
    body: "We currently ship to addresses within the United States only. International shipping isn't available yet.",
  },
  {
    icon: "Radar",
    title: "Order Tracking",
    body: "Once your order ships, you'll receive a tracking link by email. Allow up to 24 hours for tracking information to update after it's issued.",
  },
  {
    icon: "Users",
    title: "Bulk & Team Orders",
    body: "Need a large quantity? Contact support and we'll confirm an estimated delivery window for your order.",
  },
  {
    icon: "AlertTriangle",
    title: "Lost or Delayed Packages",
    body: "If your tracking shows no movement for 5+ business days or your package appears lost, contact support with your order number and we'll investigate with the carrier.",
  },
];

export default function ShippingPolicyPage() {
  return <PolicyLayout title="Shipping Policy" updated="August 9, 2026" sections={SECTIONS} />;
}
