import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { product, getVariantPrimaryImage, getVariantDisplayName } from "./data/product";

const HERO_STRIP = ["100% Cotton Fleece", "Relaxed Unisex Fit", "Free Shipping", "4 Colors"];

export default function Home() {
  return (
    <div>
      <section className="relative flex h-[100vh] min-h-[560px] w-full flex-col justify-between overflow-hidden bg-ink text-white">
        <Image
          src="/images/hero1.png"
          alt={product.name}
          fill
          priority
          className="object-cover object-[20%_center] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1536px] flex-1 items-end px-6 pb-10 sm:px-12 sm:pb-14 lg:px-0">
          <div className="max-w-xl">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-white">HoodiesHome</p>
            <h1 className="font-display mt-4 text-5xl text-white uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
             DROP 001
              <br />
              LIVE NOW
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white sm:text-base">
              Heavyweight cotton fleece, cut for everyday comfort. Pick your color and wear it on
              repeat.
            </p>
            <Link
              href="#shop"
              className="mt-8 inline-flex items-center gap-3 rounded-none bg-white py-3.5 pl-6 pr-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-zinc-200"
            >
              Shop Now
              <span className="flex h-8 w-8 items-center justify-center rounded-none bg-ink text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        <div className="relative z-10 grid w-full grid-cols-2 gap-px border-t border-white/15 bg-white/10 sm:grid-cols-4">
          {HERO_STRIP.map((label, i) => (
            <div key={label} className="bg-ink px-5 py-4">
              <p className="text-[10px] font-semibold text-zinc-500">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-zinc-200">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="w-full py-16 sm:py-20">
        <div className="flex items-baseline justify-between border-b border-line px-4 pb-4 sm:px-6">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg text-ink">01</span>
            <h2 className="font-display text-lg uppercase tracking-tight text-ink">Shop the Collection</h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {product.variants.map((variant) => (
            <Link key={variant.id} href={`/product/${variant.id}`} className="group flex flex-col bg-white">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {variant.name}
                </span>
                <Image
                  src={getVariantPrimaryImage(variant)}
                  alt={`${product.name} — ${variant.name}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-ink">{getVariantDisplayName(variant)}</p>
                <p className="mt-0.5 text-sm text-zinc-500">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative flex h-[70vh] min-h-[420px] w-full items-end overflow-hidden bg-ink text-white">
        <Image
          src="/images/hero2.png"
          alt={`${product.name} — lifestyle`}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1536px] px-6 pb-10 sm:px-12 sm:pb-14 lg:px-0">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-zinc-300">HoodiesHome</p>
          <h2 className="font-display mt-4 max-w-lg text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Worn By The City
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300 sm:text-base">
            Real streets, real comfort. Grab your color before Drop 001 sells out.
          </p>
          <Link
            href="#shop"
            className="mt-8 inline-flex items-center gap-3 rounded-none bg-white py-3.5 pl-6 pr-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-zinc-200"
          >
            Shop Now
            <span className="flex h-8 w-8 items-center justify-center rounded-none bg-ink text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
