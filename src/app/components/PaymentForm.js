"use client";

import { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";

const REQUIRED_FIELDS = ["fullName", "email", "phone", "address", "city", "state", "zip"];

export default function PaymentForm({ form, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    const isMissingField = REQUIRED_FIELDS.some((field) => !form[field]?.trim());
    if (isMissingField) {
      onError("Please fill in your contact and shipping details.");
      return;
    }

    setIsSubmitting(true);
    onError("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: form.email,
        shipping: {
          name: form.fullName,
          phone: form.phone,
          address: {
            line1: form.address,
            city: form.city,
            state: form.state,
            postal_code: form.zip,
            country: form.country,
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message || "Payment failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess();
    } else {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="flex w-full items-center justify-center gap-2 border border-ink bg-ink py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary disabled:opacity-60"
      >
        <Lock className="h-4 w-4" /> {isSubmitting ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
