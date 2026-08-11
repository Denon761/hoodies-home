import { notFound } from "next/navigation";
import { product, getVariantById } from "../../data/product";
import ProductDetail from "../../components/ProductDetail";

export function generateStaticParams() {
  return product.variants.map((variant) => ({ variantId: variant.id }));
}

export async function generateMetadata({ params }) {
  const { variantId } = await params;
  const variant = getVariantById(variantId);
  if (!variant) return {};
  return { title: `${product.name} — ${variant.name} | HoodiesHome` };
}

export default async function ProductPage({ params }) {
  const { variantId } = await params;
  if (!getVariantById(variantId)) notFound();

  return <ProductDetail variantId={variantId} />;
}
