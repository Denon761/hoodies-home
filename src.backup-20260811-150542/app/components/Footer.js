import Link from "next/link";
import { getIcon } from "../lib/icons";

const TRUST = [
  { icon: "Flag", title: "Made in USA", subtitle: "Proudly printed" },
  { icon: "ShieldCheck", title: "Premium Quality", subtitle: "Top materials" },
  { icon: "Clock", title: "Fast Production", subtitle: "2-4 business days" },
  { icon: "Lock", title: "Secure Checkout", subtitle: "Safe & encrypted" },
];

const POLICY_LINKS = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-zinc-300">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6">
        {TRUST.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={item.title} className="flex items-center gap-3">
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold text-white">{item.title}</p>
                <p className="text-[11px] text-zinc-400">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 sm:flex-row">
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
