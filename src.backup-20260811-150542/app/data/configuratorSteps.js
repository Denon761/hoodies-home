export const configuratorSteps = [
  { id: 1, label: "Hoodie" },
  { id: 2, label: "Fabric" },
  { id: 3, label: "Colors" },
  { id: 4, label: "Design" },
  { id: 5, label: "Printing" },
  { id: 6, label: "Accessories" },
  { id: 7, label: "Checkout" },
];

export function getConfiguratorStepById(id) {
  return configuratorSteps.find((s) => s.id === id);
}
