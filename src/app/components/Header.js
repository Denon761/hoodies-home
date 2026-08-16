"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Menu, Search, ShoppingBasket, X } from "lucide-react";
import { selectCartCount } from "../store/cartSlice";
import { collections, product } from "../data/product";

export default function Header() {
  const cartCount = useSelector(selectCartCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return product.variants.filter((v) => v.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <>
      <div className="bg-white py-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
        Free Shipping On All US Orders
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
        <div className="mx-auto grid h-12 max-w-[1536px] grid-cols-3 items-center px-4 sm:h-16 sm:px-6">
          <div className="flex w-fit items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-zinc-300 transition-colors hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="text-zinc-300 transition-colors hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

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

        {searchOpen && (
          <div className="border-t border-white/10 bg-ink px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-[1536px] items-center gap-3">
              <Search className="h-4 w-4 shrink-0 text-zinc-400" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colors, drops…"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button type="button" onClick={closeSearch} aria-label="Close search" className="text-zinc-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            {results.length > 0 && (
              <div className="mx-auto mt-3 max-w-[1536px] divide-y divide-white/10 border-t border-white/10">
                {results.map((v) => (
                  <Link
                    key={v.id}
                    href={`/product/${v.id}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 py-2.5 text-sm text-zinc-200 hover:text-white"
                  >
                    <span className="h-3 w-5 shrink-0 border border-white/20" style={{ backgroundColor: v.hex }} />
                    {v.name}
                  </Link>
                ))}
              </div>
            )}
            {query.trim() && results.length === 0 && (
              <p className="mx-auto mt-3 max-w-[1536px] text-sm text-zinc-500">No results for &quot;{query}&quot;</p>
            )}
          </div>
        )}
      </header>

      <div className={`fixed inset-0 z-50 ${menuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-72 flex-col bg-ink text-white transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-12 items-center justify-between border-b border-white/10 px-4 sm:h-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Menu</span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-zinc-300 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-4 py-4">
            <Link
              href="/#shop"
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-3 text-sm uppercase tracking-wide text-zinc-200 hover:text-white"
            >
              Shop All
            </Link>
            {collections.map((c) => (
              <Link
                key={c.id}
                href={`/#${c.id}`}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-3 text-sm uppercase tracking-wide text-zinc-200 hover:text-white"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm uppercase tracking-wide text-zinc-200 hover:text-white"
            >
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
