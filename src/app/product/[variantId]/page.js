import { notFound } from "next/navigation";
import {
  product,
  collections,
  getVariantById,
  getVariantPrimaryImage,
} from "../../data/product";
import ProductDetail from "../../components/ProductDetail";

export function generateStaticParams() {
  return product.variants.map((variant) => ({ variantId: variant.id }));
}

export async function generateMetadata({ params }) {
  const { variantId } = await params;
  const variant = getVariantById(variantId);
  if (!variant) return {};

  const collectionName = collections.find((c) => c.id === variant.collection)?.name;
  const title = collectionName ? `${variant.name} Hoodie — ${collectionName}` : `${variant.name} Hoodie`;
  const description = `Shop the ${variant.name} colorway of our heavyweight hoodie — 400GSM cotton fleece, relaxed unisex fit. Free shipping, secure checkout, easy returns.`;
  const image = getVariantPrimaryImage(variant);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { variantId } = await params;
  if (!getVariantById(variantId)) notFound();

  return <ProductDetail variantId={variantId} />;
}
