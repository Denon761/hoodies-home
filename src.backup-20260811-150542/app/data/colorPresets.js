const ALL_BODY_PARTS = {
  body: null,
  sleeves: null,
  hoodExterior: null,
  hoodInterior: null,
  pocket: null,
  cuffs: null,
  waistband: null,
  drawstrings: null,
};

function preset(name, mainId, interiorId = mainId, hardwareId = "black") {
  return {
    ...ALL_BODY_PARTS,
    name,
    body: mainId,
    sleeves: mainId,
    hoodExterior: mainId,
    hoodInterior: interiorId,
    pocket: mainId,
    cuffs: mainId,
    waistband: mainId,
    drawstrings: mainId,
    eyelets: hardwareId,
    labels: hardwareId,
    neckTape: mainId,
  };
}

export const colorPresets = [
  { id: "classic-black", ...preset("Classic Black", "black") },
  { id: "arctic-white", ...preset("Arctic White", "white", "white", "white") },
  { id: "forest-green", ...preset("Forest Green", "forest") },
  { id: "navy-grey", ...preset("Navy & Grey", "navy", "grey") },
  { id: "sand-cream", ...preset("Sand & Cream", "sand", "cream") },
  { id: "burgundy-beige", ...preset("Burgundy & Beige", "burgundy", "sand") },
];

export function getColorPresetById(id) {
  return colorPresets.find((p) => p.id === id);
}
