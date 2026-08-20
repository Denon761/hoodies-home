export const product = {
  id: "heavyweight-hoodie",
  name: "Heavyweight Hoodie",
  price: 98,
  description:
    "Our signature heavyweight hoodie — 400GSM cotton fleece cut for a relaxed, everyday fit. Available in every colorway across our current drops.",
  highlights: [
    "100% cotton fleece, 400gsm heavyweight",
    "Relaxed unisex fit",
    "Brushed interior for softness",
    "Ribbed cuffs and hem",
  ],
  care: [
    "Machine wash cold with like colors",
    "Do not bleach",
    "Tumble dry low",
    "Warm iron if needed — avoid printed areas",
    "Do not dry clean",
  ],
  image: "/images/hero-hoodie.png",
  variants: [
    {
      id: "white",
      name: "White",
      hex: "#f2f1ec",
      collection: "001",
      images: [
        "/images/products/001/white-front.png",
        "/images/products/001/white-back.png",
        "/images/products/001/white-prespective.png",
      ],
    },
    {
      id: "navy",
      name: "Navy",
      hex: "#1c2a44",
      collection: "001",
      images: [
        "/images/products/001/navy-front.png",
        "/images/products/001/navy-back.png",
        "/images/products/001/navy-presspectiuve.png",
      ],
    },
    {
      id: "black",
      name: "Black",
      hex: "#0a0a0a",
      collection: "001",
      images: ["/images/products/001/black-front.png"],
    },
    {
      id: "pink",
      name: "Pink",
      hex: "#f0c8d0",
      collection: "001",
      images: ["/images/products/001/pink-front.png", "/images/products/001/pink-back.png"],
    },
    {
      id: "yellow-black",
      name: "Yellow Black",
      hex: "#facc15",
      collection: "001-1",
      images: [
        "/images/products/001-1/yellow-black.jpeg",
        "/images/products/001-1/yellow-black-back.png",
      ],
    },
    {
      id: "white-black",
      name: "White Black",
      hex: "#f2f1ec",
      collection: "001-1",
      images: [
        "/images/products/001-1/white-black.png",
        "/images/products/001-1/white-black-back.png",
      ],
    },
    {
      id: "navy-beige",
      name: "Navy Beige",
      hex: "#1c2a44",
      collection: "001-1",
      images: [
        "/images/products/001-1/navy-beige.png",
        "/images/products/001-1/navy-beige-back.png",
      ],
    },
    {
      id: "green-pink",
      name: "Green Pink",
      hex: "#22c55e",
      collection: "001-1",
      images: ["/images/products/001-1/green-pink.jpeg"],
    },
    {
      id: "navy-acide",
      name: "Navy Acide",
      hex: "#1c2a44",
      collection: "acide",
      images: ["/images/products/acide/navy-acide.png", "/images/products/acide/navy-back.png"],
    },
    {
      id: "black-acide",
      name: "Black Acide",
      hex: "#0a0a0a",
      collection: "acide",
      images: [
        "/images/products/acide/acide-blcak-front.png",
        "/images/products/acide/acide-black.png",
        "/images/products/acide/black-back.png",
      ],
    },
    {
      id: "white-acide",
      name: "White Acide",
      hex: "#f2f1ec",
      collection: "acide",
      images: ["/images/products/acide/white-acide.png", "/images/products/acide/white-back.png"],
    },
    {
      id: "brown-acide",
      name: "Brown Acide",
      hex: "#6b4a34",
      collection: "acide",
      images: ["/images/products/acide/brown-acide.png", "/images/products/acide/brown-back.png"],
    },
  ],
};

export const collections = [
  { id: "001", name: "Drop 001", description: "The original heavyweight colorways." },
  { id: "001-1", name: "Drop 001.1", description: "Panelled two-tone designs." },
  { id: "acide", name: "Acide", description: "Acid-wash finish, limited run." },
];

export function getVariantsByCollection(collectionId) {
  return product.variants.filter((v) => v.collection === collectionId);
}

export const hoodieStyles = [
  {
    id: "pullover",
    name: "Pullover Hoodie",
    fit: "Classic fit",
    description: "The everyday essential — soft, relaxed, and endlessly customizable.",
    basePrice: 59.99,
    accentColor: "#0a0a0a",
    image: "/images/styles/pullover.png",
    tags: ["Best Seller"],
  },
  {
    id: "zip",
    name: "Zip Hoodie",
    fit: "Full zip",
    description: "Layer-friendly full-zip build for everyday wear.",
    basePrice: 64.99,
    accentColor: "#9ca3af",
    image: "/images/styles/zip.png",
    tags: ["Everyday"],
  },
  {
    id: "oversized",
    name: "Oversized Hoodie",
    fit: "Relaxed fit",
    description: "Dropped shoulders and a roomy silhouette for streetwear looks.",
    basePrice: 62.99,
    accentColor: "#d8c3a5",
    image: "/images/styles/oversized.png",
    tags: ["Streetwear", "Trending"],
  },
  {
    id: "heavyweight",
    name: "Heavyweight Hoodie",
    fit: "450+ GSM",
    description: "Thick, premium construction built for cold weather and durability.",
    basePrice: 69.99,
    accentColor: "#27272a",
    image: "/images/styles/heavyweight.png",
    tags: ["Best Seller", "Heavyweight", "Winter"],
  },
  {
    id: "streetwear",
    name: "Streetwear Hoodie",
    fit: "Premium street fit",
    description: "Premium fabric and a tailored street-ready cut.",
    basePrice: 74.99,
    accentColor: "#1e3a8a",
    image: "/images/styles/streetwear.png",
    tags: ["Premium", "Streetwear"],
  },
  {
    id: "cropped",
    name: "Cropped Hoodie",
    fit: "Trendy fit",
    description: "Cropped length with a modern, trend-forward fit.",
    basePrice: 57.99,
    accentColor: "#f9a8d4",
    image: "/images/styles/cropped.png",
    tags: ["Trending", "Lightweight"],
  },
  {
    id: "sleeveless",
    name: "Sleeveless Hoodie",
    fit: "Athletic fit",
    description: "Sleeveless cut built for training and layering.",
    basePrice: 54.99,
    accentColor: "#e5e7eb",
    image: "/images/styles/sleeveless.png",
    tags: ["Performance", "Lightweight"],
  },
];

export const fabrics = [
  {
    id: "heavyweight-cotton",
    name: "Heavyweight Cotton Fleece",
    gsm: 450,
    priceModifier: 0,
    recommended: true,
    swatchColor: "#1c1c1e",
    image: "/images/fabrics/heavyweight-cotton.png",
    description: "Warm, thick & premium quality",
    tags: ["Warm & Cozy", "Soft Touch", "Durable", "Breathable", "Premium Quality", "Sustainable"],
  },
  {
    id: "premium-cotton",
    name: "Premium Cotton",
    gsm: 350,
    priceModifier: 0,
    swatchColor: "#efe7da",
    image: "/images/fabrics/premium-cotton.png",
    description: "Soft, breathable everyday cotton",
    tags: ["Soft Touch", "Breathable", "Everyday Wear"],
  },
  {
    id: "french-terry",
    name: "French Terry",
    gsm: 320,
    priceModifier: 2,
    swatchColor: "#9d9d9d",
    image: "/images/fabrics/french-terry.png",
    description: "Looped interior for light warmth",
    tags: ["Lightweight", "Soft Touch", "Casual"],
  },
  {
    id: "cotton-fleece",
    name: "Cotton Fleece",
    gsm: 300,
    priceModifier: 0,
    swatchColor: "#1f2d20",
    image: "/images/fabrics/cotton-fleece.png",
    description: "Balanced weight, classic feel",
    tags: ["Classic Feel", "Durable"],
  },
  {
    id: "performance",
    name: "Performance Blend",
    gsm: 260,
    priceModifier: 4,
    swatchColor: "#1f3550",
    image: "/images/fabrics/performance.png",
    description: "Moisture-wicking, built to move",
    tags: ["Stretch", "Breathable", "Athletic"],
  },
  {
    id: "organic-cotton",
    name: "Organic Cotton",
    gsm: 320,
    priceModifier: 3,
    swatchColor: "#efe4d0",
    image: "/images/fabrics/organic-cotton.png",
    description: "Sustainably sourced, extra soft",
    tags: ["Sustainable", "Soft Touch"],
  },
];

export function getVariantById(variantId) {
  const hoodie = product.variants.find((v) => v.id === variantId);
  return hoodie ? { ...hoodie, productType: "hoodie" } : null;
}

export function getVariantImages(variant) {
  return variant.images && variant.images.length > 0 ? variant.images : [product.image];
}

export function getVariantPrimaryImage(variant) {
  return getVariantImages(variant)[0];
}

export function getVariantDisplayName(variant) {
  const collectionName = collections.find((c) => c.id === variant.collection)?.name;
  return collectionName ? `${variant.name} — ${collectionName}` : variant.name;
}

export function getStyleById(id) {
  return hoodieStyles.find((s) => s.id === id);
}

export function getFabricById(id) {
  return fabrics.find((f) => f.id === id);
}
