import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  product,
  collections,
  getVariantsByCollection,
  getVariantPrimaryImage,
  getVariantDisplayName,
} from "./data/product";
import Reveal from "./components/Reveal";

const HERO_STRIP = ["100% Cotton Fleece", "Relaxed Unisex Fit", "Free Shipping", "4 Colors"];

export default function Home() {
  return (
    <div>
      <section className="relative flex h-[100vh] min-h-[560px] w-full flex-col justify-between overflow-hidden bg-ink text-white">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 639px)" srcSet="/images/hro-bottom-mobile.png" />
          <img
            src="/images/hero1.png"
            alt={product.name}
            fetchPriority="high"
            className="h-full w-full origin-center animate-hero-zoom object-cover object-center"
          />
        </picture>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" /> */}

        <div className="relative z-10 mx-auto flex w-full max-w-[1536px] flex-1 items-end px-6 pb-10 sm:px-12 sm:pb-14 lg:px-0">
          <div className="max-w-xl">
            <p className="font-display animate-fade-up text-xs uppercase tracking-[0.35em] text-white opacity-0 [animation-delay:100ms]">
              HoodiesHome
            </p>
            <h1 className="font-display mt-4 animate-fade-up text-5xl text-white uppercase leading-[0.95] tracking-tight opacity-0 [animation-delay:250ms] sm:text-6xl lg:text-7xl">
             DROP 001
              <br />
              LIVE NOW
            </h1>
            <p className="mt-5 max-w-sm animate-fade-up text-sm leading-relaxed text-white opacity-0 [animation-delay:400ms] sm:text-base">
              Heavyweight cotton fleece, cut for everyday comfort. Pick your color and wear it on
              repeat.
            </p>
            <Link
              href="#shop"
              className="mt-8 inline-flex animate-fade-up items-center gap-3 rounded-none bg-white py-3.5 pl-6 pr-3 text-xs font-bold uppercase tracking-[0.2em] text-ink opacity-0 [animation-delay:550ms] transition-colors hover:bg-zinc-200"
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
        {collections.map((collection, index) => {
          const variants = getVariantsByCollection(collection.id);
          if (variants.length === 0) return null;
          return (
            <div key={collection.id} className={index > 0 ? "mt-16 sm:mt-20" : ""}>
              <div className="flex items-baseline justify-between border-b border-line px-4 pb-4 sm:px-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg text-ink">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-lg uppercase tracking-tight text-ink">{collection.name}</h2>
                </div>
                <p className="hidden text-xs text-zinc-500 sm:block">{collection.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
                {variants.map((variant) => (
                  <Link key={variant.id} href={`/product/${variant.id}`} className="group flex flex-col bg-white">
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        {variant.name}
                      </span>
                      <Image
                        src={getVariantPrimaryImage(variant)}
                        alt={`${product.name} — ${variant.name}`}
                        fill
                        sizes="(min-width: 640px) 25vw, 50vw"
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
            </div>
          );
        })}
      </section>

      <section className="relative flex h-[70vh] min-h-[420px] w-full items-end overflow-hidden bg-ink text-white">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 639px)" srcSet="/images/hero-mobile-top.png" />
          <img
            src="/images/hero2.png"
            alt={`${product.name} — lifestyle`}
            loading="lazy"
            className="h-full w-full origin-center animate-hero-zoom object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1536px] justify-end px-6 pb-10 sm:px-12 sm:pb-14 lg:px-0">
          <Reveal className="max-w-xl text-right">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-zinc-300">HoodiesHome</p>
            <h2 className="font-display mt-4 max-w-lg text-4xl uppercase leading-[0.95] tracking-tight ml-auto sm:text-5xl">
              Worn By The City
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300 ml-auto sm:text-base">
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
          </Reveal>
        </div>
      </section>
    </div>
  );
}
