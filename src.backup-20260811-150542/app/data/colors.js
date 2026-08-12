export const colors = [
  { id: "black", name: "Classic Black", hex: "#111111", category: "neutral" },
  { id: "white", name: "Arctic White", hex: "#F8F8F6", category: "neutral" },
  { id: "grey", name: "Grey", hex: "#9ca3af", category: "neutral" },
  { id: "charcoal", name: "Charcoal", hex: "#4b5563", category: "neutral" },
  { id: "sand", name: "Sand", hex: "#d8c3a5", category: "earth" },
  { id: "brown", name: "Brown", hex: "#7c4a2d", category: "earth" },
  { id: "cream", name: "Cream", hex: "#F0E7D8", category: "earth" },
  { id: "forest", name: "Forest Green", hex: "#24452F", category: "greens" },
  { id: "darkgreen", name: "Dark Green", hex: "#065f46", category: "greens" },
  { id: "olive", name: "Olive", hex: "#556B2F", category: "greens" },
  { id: "navy", name: "Navy", hex: "#182A48", category: "blues" },
  { id: "midnight", name: "Midnight", hex: "#172554", category: "blues" },
  { id: "teal", name: "Teal", hex: "#0d9488", category: "blues" },
  { id: "purple", name: "Purple", hex: "#6d28d9", category: "reds" },
  { id: "maroon", name: "Maroon", hex: "#641F2B", category: "reds" },
  { id: "burgundy", name: "Burgundy", hex: "#641F2B", category: "reds" },
  { id: "pink", name: "Pink", hex: "#f9a8d4", category: "reds" },
  { id: "orange", name: "Orange", hex: "#ea580c", category: "reds" },
  { id: "gold", name: "Gold", hex: "#eab308", category: "earth" },
  { id: "red", name: "Red", hex: "#dc2626", category: "reds" },
  { id: "peach", name: "Peach", hex: "#fda4af", category: "reds" },
];

export const colorCategories = [
  { id: "neutral", label: "Neutral" },
  { id: "earth", label: "Earth Tones" },
  { id: "blues", label: "Blues" },
  { id: "reds", label: "Reds & Pinks" },
  { id: "greens", label: "Greens" },
];

export function getColorById(id) {
  return colors.find((c) => c.id === id);
}
