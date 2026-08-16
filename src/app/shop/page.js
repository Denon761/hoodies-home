import Image from "next/image";
import Link from "next/link";
import {
  product,
  collections,
  getVariantsByCollection,
  getVariantPrimaryImage,
} from "../data/product";

export const metadata = {
  title: "Shop All",
  description: "Browse every colorway of the HoodiesHome heavyweight hoodie, across all current drops.",
  openGraph: {
    title: "Shop All | HoodiesHome",
    description: "Browse every colorway of the HoodiesHome heavyweight hoodie, across all current drops.",
    images: ["/images/hero1.png"],
  },
};

export default function ShopPage() {
  return (
    <div>
      <section className="border-b border-line px-4 py-10 sm:px-6 sm:py-14">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-zinc-500">HoodiesHome</p>
        <h1 className="font-display mt-3 text-2xl uppercase tracking-tight text-ink sm:text-3xl">
          Shop All
        </h1>
        <p className="mt-3 max-w-md text-xs leading-relaxed text-zinc-500 sm:text-sm">
          Every color, every drop — {product.variants.length} pieces in total.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {collections.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="border border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {c.name}
            </a>
          ))}
        </div>
      </section>

      <section className="w-full py-12 sm:py-16">
        {collections.map((collection, index) => {
          const variants = getVariantsByCollection(collection.id);
          if (variants.length === 0) return null;
          return (
            <div key={collection.id} id={collection.id} className={index > 0 ? "mt-16 sm:mt-20" : ""}>
              <div className="flex items-baseline justify-between border-b border-line px-4 pb-4 sm:px-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg text-ink">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-lg uppercase tracking-tight text-ink">{collection.name}</h2>
                </div>
                <p className="hidden text-xs text-zinc-500 sm:block">{collection.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
                {variants.map((variant) => (
                  <div key={variant.id} className="group flex flex-col bg-white">
                    <Link href={`/product/${variant.id}`} className="flex flex-col">
                      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                        <span className="absolute left-3 top-3 z-10 text-[8px] font-bold uppercase tracking-wide text-white">
                          New Arrivals
                        </span>
                        <Image
                          src={getVariantPrimaryImage(variant)}
                          alt={`${product.name} — ${variant.name}`}
                          fill
                          sizes="(min-width: 640px) 25vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="px-4 pt-3 pb-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-ink">{collection.name}</p>
                          <p className="text-sm text-zinc-500">${product.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-xs text-zinc-500">{variant.name}</p>
                      </div>
                    </Link>
                    <div className="flex items-center px-4 pb-2">
                      {variants.map((v) => (
                        <Link
                          key={v.id}
                          href={`/product/${v.id}`}
                          aria-label={v.name}
                          title={v.name}
                          className="h-1.5 w-5 border border-line"
                          style={{ backgroundColor: v.hex }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
