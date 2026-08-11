"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBasket,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { product, getVariantImages, getVariantPrimaryImage, getVariantDisplayName } from "../data/product";
import { addToCart } from "../store/cartSlice";
import AccordionItem from "./AccordionItem";
import ProductGallery from "./ProductGallery";

const SIZE_CHART = [
  { size: "S", chest: '20"', length: '27"', sleeve: '24"' },
  { size: "M", chest: '22"', length: '28"', sleeve: '25"' },
  { size: "L", chest: '24"', length: '29"', sleeve: '26"' },
  { size: "XL", chest: '26"', length: '30"', sleeve: '27"' },
  { size: "XXL", chest: '28"', length: '31"', sleeve: '28"' },
];

const SIZES = SIZE_CHART.map((row) => row.size);

export default function ProductDetail({ variantId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const relatedVariants = product.variants.filter((v) => v.id !== variant.id);
  const images = getVariantImages(variant);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("description");
  const relatedScrollRef = useRef(null);

  function toggleSection(id) {
    setOpenSection((current) => (current === id ? null : id));
  }

  function scrollRelated(direction) {
    const el = relatedScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  function handleAddToCart() {
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
    <div className="mx-auto w-full max-w-[1536px] pb-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          key={variantId}
          images={images}
          alt={`${product.name} — ${variant.name}`}
          tint={`${variant.hex}12`}
        />

        <div className="flex flex-col px-4 sm:px-0">
          <h1 className="font-display text-3xl uppercase tracking-tight text-ink sm:text-4xl">
            {getVariantDisplayName(variant)}
          </h1>
          <p className="mt-2 text-2xl font-bold text-ink">${product.price.toFixed(2)}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">
              Color: <span className="font-normal text-zinc-500">{variant.name}</span>
            </p>
            <div className="mt-3 flex items-center gap-3">
              {product.variants.map((v) => (
                <Link
                  key={v.id}
                  href={`/product/${v.id}`}
                  aria-label={v.name}
                  className={`h-10 w-10 rounded-full border border-line transition-all ${
                    v.id === variant.id ? "ring-2 ring-ink ring-offset-2 scale-110" : ""
                  }`}
                  style={{ backgroundColor: v.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">
              Size: <span className="font-normal text-zinc-500">{size}</span>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-pill border px-3 text-sm font-semibold transition-colors ${
                    s === size ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-pill border border-line">
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
              className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-ink py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              <ShoppingBasket className="h-4 w-4" /> Add to Cart
            </button>
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

            <AccordionItem title="Size Guide" isOpen={openSection === "size"} onToggle={() => toggleSection("size")}>
              <p>
                One relaxed unisex fit, runs true to size. For an oversized look, size up. All measurements in
                inches, laid flat.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[380px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <th className="py-2 pr-4">Size</th>
                      <th className="py-2 pr-4">Chest</th>
                      <th className="py-2 pr-4">Length</th>
                      <th className="py-2">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row) => (
                      <tr key={row.size} className="border-b border-line">
                        <td className="py-2 pr-4 font-semibold text-ink">{row.size}</td>
                        <td className="py-2 pr-4">{row.chest}</td>
                        <td className="py-2 pr-4">{row.length}</td>
                        <td className="py-2">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg text-ink">01</span>
            <h2 className="font-display text-lg uppercase tracking-tight text-ink">You May Also Like</h2>
          </div>
          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => scrollRelated(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRelated(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={relatedScrollRef}
          className="mt-6 flex snap-x snap-mandatory gap-px overflow-x-auto scroll-smooth bg-line sm:grid sm:grid-cols-3 sm:overflow-visible sm:snap-none"
        >
          {relatedVariants.map((v) => (
            <Link
              key={v.id}
              href={`/product/${v.id}`}
              className="group flex w-[78%] shrink-0 snap-start flex-col bg-white sm:w-auto sm:shrink"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {v.name}
                </span>
                <Image
                  src={getVariantPrimaryImage(v)}
                  alt={`${product.name} — ${v.name}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-ink">{getVariantDisplayName(v)}</p>
                <p className="mt-0.5 text-sm text-zinc-500">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
