"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Check, Minus, Plus, ShoppingBasket, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import {
  product,
  collections,
  getVariantImages,
  getVariantPrimaryImage,
  getVariantDisplayName,
  getVariantsByCollection,
} from "../data/product";
import { addToCart } from "../store/cartSlice";
import AccordionItem from "./AccordionItem";
import ProductGallery from "./ProductGallery";
import SizeGuideModal from "./SizeGuideModal";
import Reviews from "./Reviews";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetail({ variantId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const relatedVariants = product.variants.filter((v) => v.id !== variant.id).slice(0, 10);
  const images = getVariantImages(variant);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("description");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const sizeSectionRef = useRef(null);

  useEffect(() => {
    const el = sizeSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting), {
      rootMargin: "0px 0px -60% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function toggleSection(id) {
    setOpenSection((current) => (current === id ? null : id));
  }

  function handleAddToCart() {
    if (!size) {
      sizeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    dispatch(
      addToCart({
        variantId: variant.id,
        variantName: variant.name,
        hex: variant.hex,
        size,
        name: getVariantDisplayName(variant),
        price: product.price,
        image: getVariantPrimaryImage(variant),
        quantity,
      })
    );
    router.push("/checkout");
  }

  return (
    <div className={`mx-auto w-full max-w-[1536px] sm:px-6 sm:py-14 ${showStickyBar ? "pb-24" : "pb-10"}`}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <ProductGallery
          key={variantId}
          images={images}
          alt={`${product.name} — ${variant.name}`}
          tint={`${variant.hex}12`}
        />

        <div className="flex flex-col px-4 sm:px-0">
          <h1 className="font-display text-xl uppercase tracking-tight text-ink sm:text-4xl">
            {getVariantDisplayName(variant)}
          </h1>
          <p className="mt-2 text-xl font-bold text-ink">${product.price.toFixed(2)}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink">
              Color <span className="font-normal normal-case text-zinc-500">— {variant.name}</span>
            </p>
            <div className="mt-3 flex items-center gap-2">
              {getVariantsByCollection(variant.collection).map((v) => (
                <Link
                  key={v.id}
                  href={`/product/${v.id}`}
                  aria-label={v.name}
                  title={v.name}
                  className={`h-7 w-14 border transition-colors ${
                    v.id === variant.id ? "border-2 border-ink" : "border-line hover:border-zinc-400"
                  }`}
                  style={{ backgroundColor: v.hex }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSizeGuide(true)}
            className="mt-6 flex w-full items-center justify-between text-sm font-semibold uppercase tracking-wide text-ink"
          >
            Size Guide
            <span className="text-xs font-normal normal-case text-blue-600">Select my Size</span>
          </button>

          <div ref={sizeSectionRef} className="mt-3">
            <div className="grid grid-cols-6 border border-line">
              {SIZES.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex h-11 items-center justify-center text-xs font-bold uppercase transition-colors ${
                    i > 0 ? "border-l border-line" : ""
                  } ${s === size ? "bg-ink text-white" : "text-ink hover:bg-surface"}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border border-line">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-zinc-600 hover:text-primary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center text-zinc-600 hover:text-primary"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 border py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  size
                    ? "border-ink bg-ink text-white hover:bg-primary"
                    : "border-line bg-white text-zinc-400"
                }`}
              >
                {size ? (
                  <>
                    <ShoppingBasket className="h-4 w-4" /> Add to Cart
                  </>
                ) : (
                  "Select Size"
                )}
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck className="h-5 w-5 text-primary" />
              <p className="text-[11px] font-medium text-zinc-500">Free Shipping</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-[11px] font-medium text-zinc-500">Secure Checkout</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RotateCcw className="h-5 w-5 text-primary" />
              <p className="text-[11px] font-medium text-zinc-500">Easy Returns</p>
            </div>
          </div>

          <div className="mt-2">
            <AccordionItem
              title="Product Description"
              isOpen={openSection === "description"}
              onToggle={() => toggleSection("description")}
            >
              <p>{product.description}</p>
              <ul className="mt-3 space-y-1.5">
                {product.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem title="Care Instructions" isOpen={openSection === "care"} onToggle={() => toggleSection("care")}>
              <ul className="space-y-1.5">
                {product.care.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-10 sm:-mx-6 sm:mt-20 sm:pt-12">
        <div className="flex items-baseline gap-3 px-4 sm:px-6">
          <span className="font-display text-lg text-ink">01</span>
          <h2 className="font-display text-lg uppercase tracking-tight text-ink">You May Also Like</h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {relatedVariants.map((v) => {
            const siblingVariants = getVariantsByCollection(v.collection);
            return (
              <div key={v.id} className="group flex flex-col bg-white">
                <Link href={`/product/${v.id}`} className="flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <span className="absolute left-3 top-3 z-10 text-[8px] font-bold uppercase tracking-wide text-white">
                      New Arrivals
                    </span>
                    <Image
                      src={getVariantPrimaryImage(v)}
                      alt={`${product.name} — ${v.name}`}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 pt-3 pb-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-ink">
                        {collections.find((c) => c.id === v.collection)?.name}
                      </p>
                      <p className="text-sm text-zinc-500">${product.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">{v.name}</p>
                  </div>
                </Link>
                <div className="flex items-center px-4 pb-2">
                  {siblingVariants.map((sv) => (
                    <Link
                      key={sv.id}
                      href={`/product/${sv.id}`}
                      aria-label={sv.name}
                      title={sv.name}
                      className="h-1.5 w-5 border border-line"
                      style={{ backgroundColor: sv.hex }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/shop"
          className="mt-px flex w-full items-center justify-center bg-ink/10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink backdrop-blur-md transition-colors hover:bg-ink/20"
        >
          See More
        </Link>
      </div>

      <Reviews variantId={variant.id} index="02" heading="Customer Reviews" limit={6} />

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/80 backdrop-blur-md transition-transform duration-300 ease-out ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1536px] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="hidden min-w-0 flex-1 sm:block">
            <p className="truncate text-sm font-semibold text-ink">{getVariantDisplayName(variant)}</p>
            <p className="text-sm text-zinc-500">${product.price.toFixed(2)}</p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex flex-1 items-center justify-center gap-2 border py-3 text-sm font-semibold uppercase tracking-wide transition-colors sm:flex-none sm:px-10 ${
              size ? "border-ink bg-ink text-white hover:bg-primary" : "border-line bg-white text-zinc-400"
            }`}
          >
            {size ? (
              <>
                <ShoppingBasket className="h-4 w-4" /> Add to Cart
              </>
            ) : (
              "Select Size"
            )}
          </button>
        </div>
      </div>

      <SizeGuideModal open={showSizeGuide} onClose={() => setShowSizeGuide(false)} onSelectSize={setSize} />
    </div>
  );
}
