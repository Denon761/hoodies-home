import { product } from "./data/product";
import { SITE_URL } from "./lib/site";

export default function sitemap() {
  const staticRoutes = [
    { url: "", changeFrequency: "weekly", priority: 1 },
    { url: "/shop", changeFrequency: "weekly", priority: 0.9 },
    { url: "/cart", changeFrequency: "monthly", priority: 0.3 },
    { url: "/shipping-policy", changeFrequency: "yearly", priority: 0.4 },
    { url: "/refund-policy", changeFrequency: "yearly", priority: 0.4 },
    { url: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  ].map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productRoutes = product.variants.map((variant) => ({
    url: `${SITE_URL}/product/${variant.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
