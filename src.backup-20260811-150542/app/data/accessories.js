export const accessoryLocations = [
  { id: "insideNeck", label: "Inside Neck" },
  { id: "sideSeam", label: "Side Seam" },
  { id: "frontBottom", label: "Front Bottom" },
  { id: "hem", label: "Hem" },
  { id: "cuff", label: "Cuff" },
  { id: "hood", label: "Hood" },
];

export const accessories = [
  {
    id: "wovenLabel",
    name: "Custom Woven Label",
    description: "Add your logo",
    price: 1.0,
    icon: "Tag",
    locations: ["insideNeck", "sideSeam"],
  },
  {
    id: "hangTag",
    name: "Hang Tag",
    description: "Custom design",
    price: 1.5,
    icon: "Tags",
    locations: ["sideSeam"],
  },
  {
    id: "leatherPatch",
    name: "Leather Patch",
    description: "Front bottom",
    price: 3.0,
    icon: "Square",
    locations: ["frontBottom"],
  },
  {
    id: "drawstrings",
    name: "Premium Drawstrings",
    description: "Upgraded tips",
    price: 1.0,
    icon: "Cable",
    locations: ["hood"],
  },
  {
    id: "metalEyelets",
    name: "Metal Eyelets",
    description: "Metal finish",
    price: 1.5,
    icon: "CircleDot",
    locations: ["hood"],
  },
  {
    id: "reflectiveTape",
    name: "Reflective Tape",
    description: "Visibility trim",
    price: 2.0,
    icon: "Sun",
    locations: ["cuff", "hem"],
  },
  {
    id: "customPackaging",
    name: "Custom Packaging",
    description: "Premium box",
    price: 2.5,
    icon: "Package",
    locations: ["hem"],
  },
];

export function getAccessoryById(id) {
  return accessories.find((a) => a.id === id);
}

export function getAccessoryLocationById(id) {
  return accessoryLocations.find((l) => l.id === id);
}
