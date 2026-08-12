import { product, getVariantById, getVariantPrimaryImage } from "../data/product";

export const VALID_SIZES = ["S", "M", "L", "XL", "XXL"];
export const ALLOWED_COUNTRIES = ["US", "CA", "GB", "AU", "IN"];
const MAX_QUANTITY_PER_LINE = 20;

export function buildOrderItems(items, baseUrl) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: "Cart is empty" };
  }

  const orderItems = [];
  for (const item of items) {
    const variant = getVariantById(item?.variantId);
    const quantity = Number(item?.quantity);
    const size = item?.size;

    if (
      !variant ||
      !VALID_SIZES.includes(size) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY_PER_LINE
    ) {
      return { error: "Invalid cart item" };
    }

    orderItems.push({
      id: `${variant.id}-${size}`,
      name: product.name,
      variantName: variant.name,
      size,
      price: product.price,
      quantity,
      image: `${baseUrl}${getVariantPrimaryImage(variant)}`,
    });
  }

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { orderItems, total };
}
