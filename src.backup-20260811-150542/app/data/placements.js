export const placements = [
  { id: "front", label: "Front", icon: "Shirt", sizeMultiplier: 1 },
  { id: "back", label: "Back", icon: "FlipVertical", sizeMultiplier: 1.5 },
  { id: "leftChest", label: "Left Chest", icon: "PanelLeft", sizeMultiplier: 0.6 },
  { id: "rightChest", label: "Right Chest", icon: "PanelRight", sizeMultiplier: 0.6 },
  { id: "leftSleeve", label: "Left Sleeve", icon: "MoveDiagonal", sizeMultiplier: 0.5 },
  { id: "rightSleeve", label: "Right Sleeve", icon: "MoveDiagonal2", sizeMultiplier: 0.5 },
  { id: "hood", label: "Hood", icon: "Triangle", sizeMultiplier: 0.7 },
  { id: "pocket", label: "Pocket", icon: "Square", sizeMultiplier: 0.5 },
  { id: "neckLabel", label: "Neck Label", icon: "Tag", sizeMultiplier: 0.4 },
];

export function getPlacementById(id) {
  return placements.find((p) => p.id === id);
}
