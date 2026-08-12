import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Order Confirmed | HoodiesHome",
};

export default function CheckoutSuccessPage({ searchParams }) {
  const referenceId = searchParams?.payment_intent || searchParams?.session_id;

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
      <CheckCircle2 className="h-12 w-12 text-success" />
      <h1 className="font-display mt-4 text-xl uppercase text-ink">Order Confirmed</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Thanks for your order! Your payment was successful.
      </p>
      {referenceId && (
        <p className="mt-1 text-xs text-zinc-400">
          Reference: <span className="font-mono">{referenceId}</span>
        </p>
      )}
      <p className="mt-3 text-xs text-zinc-400">
        A confirmation email will be sent shortly.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
