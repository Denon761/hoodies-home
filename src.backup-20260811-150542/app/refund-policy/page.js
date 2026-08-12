import PolicyLayout from "../components/PolicyLayout";

export const metadata = { title: "Refund Policy | HoodiesHome" };

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy" updated="August 9, 2026">
      <section>
        <h2>30-Day Guarantee</h2>
        <p>
          Every custom hoodie is backed by our 30-day guarantee. If your order arrives damaged,
          misprinted, or with a manufacturing defect, we&apos;ll replace it or refund you in full —
          no questions asked.
        </p>
      </section>
      <section>
        <h2>Custom Orders</h2>
        <p>
          Because each hoodie is printed and produced to your exact design, we generally cannot
          accept returns for buyer&apos;s remorse (wrong size, color preference, etc.) unless the
          item is defective or significantly different from your approved design.
        </p>
      </section>
      <section>
        <h2>How to Request a Refund</h2>
        <ul>
          <li>Contact support within 30 days of delivery with your order number.</li>
          <li>Include photos of the issue for defective or misprinted items.</li>
          <li>Approved refunds are issued to your original payment method within 5–10 business days.</li>
        </ul>
      </section>
      <section>
        <h2>Cancellations</h2>
        <p>
          Orders can be cancelled or edited free of charge before production begins. Once
          production has started, cancellations may not be possible since each hoodie is made to
          order.
        </p>
      </section>
    </PolicyLayout>
  );
}
