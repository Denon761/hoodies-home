"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Search, Heart, ShoppingCart, Menu } from "lucide-react";
import { selectCartCount } from "../store/cartSlice";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/customize", label: "Customize" },
];

export default function Header() {
  const pathname = usePathname();
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button type="button" className="lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            Hoodies<span className="text-primary">Home</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-300 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "text-white" : "hover:text-white"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Search className="hidden h-5 w-5 text-zinc-300 sm:block" />
          <Heart className="hidden h-5 w-5 text-zinc-300 sm:block" />
          <Link href="/cart" className="relative" aria-label="Cart">
            <ShoppingCart className="h-5 w-5 text-zinc-300" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
