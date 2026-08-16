import Link from "next/link";
import Image from "next/image";
import { getIcon } from "../lib/icons";

const TRUST = [
  { icon: "Thermometer", title: "400GSM Heavyweight", subtitle: "Cotton fleece" },
  { icon: "ShieldCheck", title: "Premium Quality", subtitle: "Top materials" },
  { icon: "Feather", title: "Brushed Interior", subtitle: "Soft & cozy" },
  { icon: "Lock", title: "Secure Checkout", subtitle: "Safe & encrypted" },
];

const SHOP_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Go To Shop" },
  { href: "/cart", label: "Cart" },
];

const POLICY_LINKS = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-zinc-300">
      <div className="mx-auto max-w-[1536px] px-4 pb-10 pt-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Drop 001</p>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              One hoodie, four colors. Heavyweight cotton fleece, cut for everyday comfort.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Shop</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              {SHOP_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-zinc-300 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Help</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              {POLICY_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-zinc-300 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {TRUST.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.title} className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-white" />
                <div>
                  <p className="text-xs font-semibold text-white">{item.title}</p>
                  <p className="text-[11px] text-zinc-400">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">We Accept</p>
          <Image
            src="/images/payment.webp"
            alt="Stripe, Amex, Mastercard, PayPal, Visa, Apple Pay, Google Pay"
            width={2306}
            height={504}
            className="h-12 w-auto"
          />
        </div>

        <div className="mt-10 border-t border-white/10 pt-10">
          <Image
            src="/images/footer.png"
            alt="HoodiesHome"
            width={5946}
            height={682}
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1536px] flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[11px] text-zinc-500">© {new Date().getFullYear()} HoodiesHome. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-zinc-400">
            {POLICY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
