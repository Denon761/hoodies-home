"use client";

export default function PropertiesPanel({ layer, onChange }) {
  if (!layer) {
    return (
      <div className="rounded-card border border-line bg-white p-4 shadow-card">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">Properties</p>
        <p className="text-xs text-zinc-400">Select a layer to edit its properties.</p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-line bg-white p-4 shadow-card">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Properties</p>

      {layer.type === "text" && (
        <div className="mb-3">
          <FieldLabel>Text</FieldLabel>
          <input
            type="text"
            value={layer.text}
            onChange={(e) => onChange({ text: e.target.value })}
            className="w-full rounded-lg border border-line px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none"
          />
          <div className="mt-2 flex items-center gap-2">
            <FieldLabel>Color</FieldLabel>
            <input
              type="color"
              value={layer.fill}
              onChange={(e) => onChange({ fill: e.target.value })}
              className="h-7 w-7 cursor-pointer rounded border border-line"
            />
            <FieldLabel>Size</FieldLabel>
            <input
              type="number"
              value={layer.fontSize}
              onChange={(e) => onChange({ fontSize: Number(e.target.value) || 12 })}
              className="w-16 rounded-lg border border-line px-2 py-1.5 text-xs focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      )}

      {layer.type === "shape" && (
        <div className="mb-3 flex items-center gap-2">
          <FieldLabel>Fill</FieldLabel>
          <input
            type="color"
            value={layer.fill}
            onChange={(e) => onChange({ fill: e.target.value })}
            className="h-7 w-7 cursor-pointer rounded border border-line"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <NumberField label="X" value={layer.x} onChange={(v) => onChange({ x: v })} />
        <NumberField label="Y" value={layer.y} onChange={(v) => onChange({ y: v })} />
        <NumberField label="Width" value={layer.width} onChange={(v) => onChange({ width: v })} />
        <NumberField label="Height" value={layer.height} onChange={(v) => onChange({ height: v })} />
        <NumberField label="Rotation" value={layer.rotation || 0} onChange={(v) => onChange({ rotation: v })} />
        <NumberField
          label="Opacity"
          value={Math.round((layer.opacity ?? 1) * 100)}
          onChange={(v) => onChange({ opacity: Math.min(1, Math.max(0, v / 100)) })}
        />
      </div>
    </div>
  );
}

function FieldLabel({ children }) {
  return <label className="text-[11px] font-medium text-zinc-500">{children}</label>;
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="block text-[11px] font-medium text-zinc-500">
      {label}
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1 w-full rounded-lg border border-line px-2 py-1.5 text-xs text-ink focus:border-primary focus:outline-none"
      />
    </label>
  );
}
