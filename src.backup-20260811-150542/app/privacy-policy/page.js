import PolicyLayout from "../components/PolicyLayout";

export const metadata = { title: "Privacy Policy | HoodiesHome" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" updated="August 9, 2026">
      <section>
        <h2>Information We Collect</h2>
        <p>
          When you design a hoodie, add items to your cart, or check out, we collect the
          information you provide directly — such as your name, email, phone number, shipping
          address, and the customization choices you make.
        </p>
      </section>
      <section>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To process and fulfill your orders.</li>
          <li>To send order confirmations and shipping updates.</li>
          <li>To save your cart and design selections between visits, on this device.</li>
          <li>To improve our products and customer experience.</li>
        </ul>
      </section>
      <section>
        <h2>Data Storage</h2>
        <p>
          Cart and design information is stored locally in your browser so you can pick up where
          you left off. We do not sell your personal information to third parties.
        </p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions about this policy or want your data removed, reach out through
          our support channels.
        </p>
      </section>
    </PolicyLayout>
  );
}
