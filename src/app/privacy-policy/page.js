import PolicyLayout from "../components/PolicyLayout";

export const metadata = {
  title: "Privacy Policy",
  description: "How HoodiesHome collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    icon: "Database",
    title: "Information We Collect",
    body: "When you add items to your cart or check out, we collect the information you provide directly — such as your name, email, phone number, and shipping address.",
  },
  {
    icon: "Settings",
    title: "How We Use Your Information",
    list: [
      "To process and fulfill your orders.",
      "To send order confirmations and shipping updates.",
      "To save your cart between visits, on this device.",
      "To improve our products and customer experience.",
    ],
  },
  {
    icon: "HardDrive",
    title: "Data Storage",
    body: "Cart information is stored locally in your browser so you can pick up where you left off. We do not sell your personal information to third parties.",
  },
  {
    icon: "Cookie",
    title: "Cookies & Local Storage",
    body: "We use local browser storage — not third-party tracking cookies — to remember your cart between visits. You can clear this at any time by clearing your browser data.",
  },
  {
    icon: "Share2",
    title: "Third-Party Services",
    body: "We don't share your personal information with advertisers or data brokers. Any service we use to process an order only receives the information needed to fulfill that order.",
  },
  {
    icon: "UserCheck",
    title: "Your Rights",
    body: "You can request a copy of the information we hold about you, or ask us to delete it, at any time by contacting support.",
  },
  {
    icon: "Baby",
    title: "Children's Privacy",
    body: "HoodiesHome is not directed at children under 13, and we do not knowingly collect information from them.",
  },
  {
    icon: "FileText",
    title: "Changes to This Policy",
    body: 'We may update this policy from time to time. The "last updated" date at the top of this page reflects the most recent revision.',
  },
  {
    icon: "Mail",
    title: "Contact Us",
    body: "If you have questions about this policy or want your data removed, reach out through our support channels.",
  },
];

export default function PrivacyPolicyPage() {
  return <PolicyLayout title="Privacy Policy" updated="August 9, 2026" sections={SECTIONS} />;
}
