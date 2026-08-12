import PolicyLayout from "../components/PolicyLayout";

export const metadata = { title: "Shipping Policy | HoodiesHome" };

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" updated="August 9, 2026">
      <section>
        <h2>Production Time</h2>
        <p>
          Every hoodie is made to order. Production typically takes 2–4 business days before your
          order ships, depending on the printing method and quantity selected.
        </p>
      </section>
      <section>
        <h2>Shipping Time</h2>
        <p>
          Once produced, standard shipping within the USA takes an additional 2–3 business days.
          You&apos;ll receive a tracking number by email as soon as your order ships.
        </p>
      </section>
      <section>
        <h2>Free Shipping</h2>
        <p>Orders with a subtotal of $99 or more after discounts qualify for free standard shipping.</p>
      </section>
      <section>
        <h2>Bulk & Team Orders</h2>
        <p>
          Large bulk orders may require additional production time. We&apos;ll confirm an
          estimated delivery window when you place a bulk order.
        </p>
      </section>
    </PolicyLayout>
  );
}
