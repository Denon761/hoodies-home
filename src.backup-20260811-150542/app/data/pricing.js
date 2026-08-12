import { getStyleById } from "./hoodieStyles";
import { getFabricById } from "./fabrics";
import { getPrintingMethodById } from "./printingMethods";
import { getPlacementById } from "./placements";
import { getAccessoryById } from "./accessories";

const FREE_SHIPPING_THRESHOLD = 99;
const FLAT_SHIPPING = 8.99;
const TAX_RATE = 0.0825;
const COLOR_UPGRADE_FEE = 10;

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getDiscountRate(quantity) {
  if (quantity >= 50) return 0.2;
  if (quantity >= 20) return 0.15;
  if (quantity >= 10) return 0.1;
  if (quantity >= 5) return 0.05;
  return 0;
}

export function getPrintingCostPerUnit(methodId, locationId) {
  const method = getPrintingMethodById(methodId);
  const placement = getPlacementById(locationId);
  if (!method || !placement) return 0;
  return round2(method.pricePerPlacement * placement.sizeMultiplier);
}

export function hasColorUpgrade(colors, defaultColors) {
  if (!colors || !defaultColors) return false;
  return Object.keys(defaultColors).some((part) => colors[part] !== defaultColors[part]);
}

/**
 * Single source of truth for every price shown in the app.
 * config: { productId, fabricId, colors, quantity, printingAssignments, accessorySelections }
 */
export function getPriceBreakdown(config = {}) {
  const {
    productId,
    fabricId,
    colors = {},
    quantity = 1,
    printingAssignments = [],
    accessorySelections = [],
  } = config;

  const style = getStyleById(productId);
  const fabric = getFabricById(fabricId);

  const basePrice = style?.basePrice ?? 0;
  const fabricModifier = fabric?.priceModifier ?? 0;
  const unitBase = round2(basePrice + fabricModifier);
  const baseTotal = round2(unitBase * quantity);

  const colorUpgrade = hasColorUpgrade(colors, style?.defaultColors) ? COLOR_UPGRADE_FEE : 0;

  const printingLines = printingAssignments.map((assignment) => {
    const method = getPrintingMethodById(assignment.methodId);
    const placement = getPlacementById(assignment.locationId);
    const perUnit = getPrintingCostPerUnit(assignment.methodId, assignment.locationId);
    return {
      id: assignment.id,
      label: `${method?.name ?? "Printing"} (${placement?.label ?? assignment.locationId})`,
      perUnit,
      total: round2(perUnit * quantity),
    };
  });
  const printingTotal = round2(printingLines.reduce((sum, line) => sum + line.total, 0));

  const accessoryLines = accessorySelections.map((selection) => {
    const accessory = getAccessoryById(selection.id);
    const perUnit = round2((accessory?.price ?? 0) * (selection.quantity ?? 1));
    return {
      id: selection.id,
      label: accessory?.name ?? selection.id,
      perUnit,
      total: round2(perUnit * quantity),
    };
  });
  const accessoriesTotal = round2(accessoryLines.reduce((sum, line) => sum + line.total, 0));

  const subtotal = round2(baseTotal + printingTotal + accessoriesTotal + colorUpgrade);
  const discountRate = getDiscountRate(quantity);
  const discount = round2(subtotal * discountRate);
  const afterDiscount = round2(subtotal - discount);
  const shipping =
    afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax = round2(afterDiscount * TAX_RATE);
  const total = round2(afterDiscount + shipping + tax);

  return {
    style,
    fabric,
    basePrice,
    fabricModifier,
    unitBase,
    baseTotal,
    colorUpgrade,
    printingLines,
    printingTotal,
    accessoryLines,
    accessoriesTotal,
    subtotal,
    discountRate,
    discount,
    shipping,
    tax,
    total,
    quantity,
  };
}

export function getBulkPriceTiers(config = {}) {
  const tiers = [1, 10, 25, 50, 100];
  return tiers.map((quantity, index) => {
    const nextTier = tiers[index + 1];
    const breakdown = getPriceBreakdown({ ...config, quantity });
    return {
      range: nextTier ? `${quantity}–${nextTier - 1}` : `${quantity}+`,
      unitPrice: round2(breakdown.total / quantity),
    };
  });
}

export function getCartTotals(cartItems = []) {
  return cartItems.reduce(
    (acc, item) => {
      const breakdown = getPriceBreakdown(item.selections);
      acc.subtotal = round2(acc.subtotal + breakdown.subtotal);
      acc.discount = round2(acc.discount + breakdown.discount);
      acc.total = round2(acc.total + breakdown.total);
      return acc;
    },
    { subtotal: 0, discount: 0, total: 0 }
  );
}
