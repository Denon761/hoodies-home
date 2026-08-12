import { getColorById } from "../data/colors";

const FALLBACK = "#111111";

function hex(colors, part) {
  const value = colors?.[part];
  if (!value) return FALLBACK;
  if (value.startsWith("#")) return value;
  return getColorById(value)?.hex || FALLBACK;
}

/**
 * Per-part colorable flat hoodie preview.
 * `colors` maps colorParts ids (body, sleeves, hoodExterior, hoodInterior, pocket,
 * cuffs, waistband, drawstrings, eyelets, labels, neckTape) to color ids from data/colors.js.
 */
export default function HoodiePreview({ colors = {}, view = "front", className }) {
  const mirrored = view === "right";
  const showBack = view === "back";
  const showFront = !showBack;

  const body = hex(colors, "body");
  const sleeves = hex(colors, "sleeves");
  const hoodExterior = hex(colors, "hoodExterior");
  const hoodInterior = hex(colors, "hoodInterior");
  const pocket = hex(colors, "pocket");
  const cuffs = hex(colors, "cuffs");
  const waistband = hex(colors, "waistband");
  const drawstrings = hex(colors, "drawstrings");
  const eyelets = hex(colors, "eyelets");
  const labels = hex(colors, "labels");
  const neckTape = hex(colors, "neckTape");

  return (
    <svg
      viewBox="0 0 300 340"
      className={className}
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* hood exterior */}
      <path d="M90 40 Q150 -8 210 40 L225 85 Q150 58 75 85 Z" fill={hoodExterior} />
      {/* hood interior peek */}
      <path d="M128 68 Q150 54 172 68 L172 84 Q150 74 128 84 Z" fill={hoodInterior} />
      {/* neck tape */}
      <rect x="122" y="83" width="56" height="5" rx="2.5" fill={neckTape} />
      {/* body */}
      <path d="M75 85 Q150 58 225 85 L245 292 Q150 320 55 292 Z" fill={body} />
      {/* left sleeve */}
      <path d="M75 85 L20 140 L15 258 L58 268 L80 150 Z" fill={sleeves} />
      {/* right sleeve */}
      <path d="M225 85 L280 140 L285 258 L242 268 L220 150 Z" fill={sleeves} />
      {/* cuffs */}
      <rect x="14" y="255" width="46" height="16" rx="4" fill={cuffs} />
      <rect x="240" y="255" width="46" height="16" rx="4" fill={cuffs} />
      {/* waistband */}
      <path d="M58 288 Q150 314 242 288 L245 300 Q150 326 55 300 Z" fill={waistband} />

      {showFront && (
        <>
          <rect x="105" y="220" width="90" height="52" rx="10" fill={pocket} />
          <line x1="140" y1="95" x2="132" y2="150" stroke={drawstrings} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="160" y1="95" x2="168" y2="150" stroke={drawstrings} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="132" cy="93" r="3" fill={eyelets} />
          <circle cx="168" cy="93" r="3" fill={eyelets} />
        </>
      )}

      {showBack && <rect x="128" y="105" width="44" height="14" rx="3" fill={labels} opacity="0.9" />}
    </svg>
  );
}
