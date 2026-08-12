export const colorParts = [
  { id: "body", label: "Body" },
  { id: "sleeves", label: "Sleeves" },
  { id: "hoodExterior", label: "Hood Exterior" },
  { id: "hoodInterior", label: "Hood Interior" },
  { id: "pocket", label: "Pocket" },
  { id: "cuffs", label: "Cuffs" },
  { id: "waistband", label: "Waistband" },
  { id: "drawstrings", label: "Drawstrings" },
  { id: "eyelets", label: "Eyelets" },
  { id: "labels", label: "Labels" },
  { id: "neckTape", label: "Neck Tape" },
];

export function getColorPartById(id) {
  return colorParts.find((p) => p.id === id);
}
