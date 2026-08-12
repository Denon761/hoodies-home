"use client";

import { Eye, EyeOff, Lock, Unlock, Copy, Trash2, ChevronUp, ChevronDown, Type, ImageIcon, Shapes } from "lucide-react";

const TYPE_ICON = { text: Type, image: ImageIcon, shape: Shapes };

export default function LayersPanel({ layers, selectedLayerId, onSelect, onToggleVisible, onToggleLock, onDuplicate, onDelete, onReorder }) {
  return (
    <div className="rounded-card border border-line bg-white p-4 shadow-card">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Layers</p>
      {layers.length === 0 && <p className="text-xs text-zinc-400">No layers on this view yet.</p>}
      <ul className="space-y-1.5">
        {[...layers].reverse().map((layer) => {
          const Icon = TYPE_ICON[layer.type] || Shapes;
          const selected = layer.id === selectedLayerId;
          return (
            <li
              key={layer.id}
              onClick={() => onSelect(layer.id)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition-colors ${
                selected ? "border-primary bg-primary-light" : "border-line hover:border-primary/40"
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
              <span className="flex-1 truncate font-medium text-ink">
                {layer.type === "text" ? layer.text || "Text" : layer.type === "image" ? "Image" : layer.shapeType}
              </span>
              <IconButton onClick={() => onToggleVisible(layer.id)} title="Toggle visibility">
                {layer.visible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </IconButton>
              <IconButton onClick={() => onToggleLock(layer.id)} title="Toggle lock">
                {layer.locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
              </IconButton>
              <IconButton onClick={() => onReorder(layer.id, "up")} title="Bring forward">
                <ChevronUp className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton onClick={() => onReorder(layer.id, "down")} title="Send backward">
                <ChevronDown className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton onClick={() => onDuplicate(layer.id)} title="Duplicate">
                <Copy className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton onClick={() => onDelete(layer.id)} title="Delete">
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function IconButton({ children, onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-zinc-500 hover:bg-white hover:text-ink"
    >
      {children}
    </button>
  );
}
