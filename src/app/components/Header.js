"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { ShoppingBasket } from "lucide-react";
import { selectCartCount } from "../store/cartSlice";

export default function Header() {
  const cartCount = useSelector(selectCartCount);

  return (
    <>
      <div className="bg-white py-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
        Free Shipping On All US Orders
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
        <div className="mx-auto grid h-16 max-w-[1536px] grid-cols-3 items-center px-4 sm:px-6">
          <Link
            href="/#shop"
            className="w-fit text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
          >
            Drop 001
          </Link>

          <Link href="/" className="justify-self-center" aria-label="HoodiesHome — Home">
            <Image src="/images/header.png" alt="HoodiesHome" width={846} height={922} className="h-10 w-auto" priority />
          </Link>

          <Link href="/cart" className="relative w-fit justify-self-end" aria-label="Cart">
            <ShoppingBasket className="h-5 w-5 text-zinc-300" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-ink">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
