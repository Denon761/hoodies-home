import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Payment Cancelled | HoodiesHome",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col items-center px-4 py-24 text-center sm:px-6">
      <XCircle className="h-12 w-12 text-red-500" />
      <h1 className="font-display mt-4 text-xl uppercase text-ink">Payment Cancelled</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Your payment was cancelled. Your cart is still saved — you can complete your order anytime.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/cart"
          className="rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
        >
          Return to Cart
        </Link>
        <Link
          href="/"
          className="rounded-pill border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
