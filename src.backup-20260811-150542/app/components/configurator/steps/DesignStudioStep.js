"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, Type, Square, Circle as CircleIcon, Triangle, Star, Undo2, Redo2 } from "lucide-react";
import {
  selectCustomizer,
  setActiveView,
  addDesignLayer,
  updateDesignLayer,
  commitDesignLayer,
  removeDesignLayer,
  duplicateDesignLayer,
  reorderDesignLayer,
  setSelectedLayer,
  undo,
  redo,
} from "../../../store/customizerSlice";
import { getStyleById } from "../../../data/hoodieStyles";
import { getColorById } from "../../../data/colors";
import HoodiePreview from "../../HoodiePreview";
import ViewSelector from "../../ViewSelector";
import DesignCanvasStage, { STAGE_WIDTH, STAGE_HEIGHT } from "../design/DesignCanvasStage";
import LayersPanel from "../design/LayersPanel";
import PropertiesPanel from "../design/PropertiesPanel";
import DesignQualityPanel from "../design/DesignQualityPanel";

export default function DesignStudioStep() {
  const dispatch = useDispatch();
  const customizer = useSelector(selectCustomizer);
  const fileInputRef = useRef(null);
  const style = getStyleById(customizer.productId);
  const bodyColor = getColorById(customizer.colors.body);
  const view = customizer.activeView;
  const layers = customizer.design[view] || [];
  const selectedLayer = layers.find((l) => l.id === customizer.selectedLayerId) || null;

  useEffect(() => {
    function handleKeyDown(e) {
      const isMeta = e.ctrlKey || e.metaKey;
      if (!isMeta) return;
      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        dispatch(undo());
      } else if (e.key.toLowerCase() === "y" || (e.key.toLowerCase() === "z" && e.shiftKey)) {
        e.preventDefault();
        dispatch(redo());
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  function addText() {
    dispatch(
      addDesignLayer({
        view,
        layer: {
          type: "text",
          text: "Your Text",
          fontSize: 28,
          fill: "#111111",
          fontFamily: "sans-serif",
          x: 90,
          y: 150,
          width: 140,
          height: 36,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
        },
      })
    );
  }

  function addShape(shapeType) {
    const isCentered = shapeType === "circle" || shapeType === "triangle" || shapeType === "star";
    dispatch(
      addDesignLayer({
        view,
        layer: {
          type: "shape",
          shapeType,
          fill: "#2563eb",
          x: isCentered ? STAGE_WIDTH / 2 : STAGE_WIDTH / 2 - 40,
          y: isCentered ? STAGE_HEIGHT / 2 : STAGE_HEIGHT / 2 - 40,
          width: 80,
          height: 80,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
        },
      })
    );
  }

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result;
      const probe = new window.Image();
      probe.onload = () => {
        const maxDim = 140;
        const ratio = probe.width / probe.height || 1;
        const width = ratio >= 1 ? maxDim : maxDim * ratio;
        const height = ratio >= 1 ? maxDim / ratio : maxDim;
        dispatch(
          addDesignLayer({
            view,
            layer: {
              type: "image",
              src,
              naturalWidth: probe.width,
              naturalHeight: probe.height,
              x: STAGE_WIDTH / 2 - width / 2,
              y: STAGE_HEIGHT / 2 - height / 2,
              width,
              height,
              rotation: 0,
              opacity: 1,
              visible: true,
              locked: false,
            },
          })
        );
      };
      probe.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[64px_1fr_260px]">
      <div className="flex flex-row gap-2 rounded-card border border-line bg-white p-2 shadow-card lg:flex-col lg:p-3">
        <ToolButton icon={Upload} label="Upload" onClick={() => fileInputRef.current?.click()} />
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        <ToolButton icon={Type} label="Text" onClick={addText} />
        <ToolButton icon={Square} label="Rect" onClick={() => addShape("rect")} />
        <ToolButton icon={CircleIcon} label="Circle" onClick={() => addShape("circle")} />
        <ToolButton icon={Triangle} label="Triangle" onClick={() => addShape("triangle")} />
        <ToolButton icon={Star} label="Star" onClick={() => addShape("star")} />
        <div className="my-1 hidden border-t border-line lg:block" />
        <ToolButton icon={Undo2} label="Undo" onClick={() => dispatch(undo())} />
        <ToolButton icon={Redo2} label="Redo" onClick={() => dispatch(redo())} />
      </div>

      <div className="space-y-4">
        <div className="rounded-card border border-line bg-white p-5 shadow-card">
          <h1 className="text-lg font-bold text-ink">Design Studio</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Upload artwork, add text or shapes, then drag, resize, and rotate them on the hoodie.
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <ViewSelector
              views={style?.views || []}
              activeView={view}
              onSelect={(v) => dispatch(setActiveView(v))}
              orientation="horizontal"
            />
            <div
              className="relative mx-auto shrink-0 overflow-hidden rounded-lg"
              style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT, backgroundColor: `${bodyColor?.hex || "#000"}10` }}
            >
              <HoodiePreview
                colors={customizer.colors}
                view={view}
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
              <DesignCanvasStage
                layers={layers}
                selectedLayerId={customizer.selectedLayerId}
                onSelect={(id) => dispatch(setSelectedLayer(id))}
                onChange={(id, changes) => dispatch(updateDesignLayer({ view, id, changes }))}
                onCommit={() => dispatch(commitDesignLayer())}
              />
            </div>
          </div>
        </div>

        <DesignQualityPanel layers={layers} />
      </div>

      <div className="space-y-4">
        <LayersPanel
          layers={layers}
          selectedLayerId={customizer.selectedLayerId}
          onSelect={(id) => dispatch(setSelectedLayer(id))}
          onToggleVisible={(id) => {
            const layer = layers.find((l) => l.id === id);
            dispatch(updateDesignLayer({ view, id, changes: { visible: layer.visible === false } }));
            dispatch(commitDesignLayer());
          }}
          onToggleLock={(id) => {
            const layer = layers.find((l) => l.id === id);
            dispatch(updateDesignLayer({ view, id, changes: { locked: !layer.locked } }));
            dispatch(commitDesignLayer());
          }}
          onDuplicate={(id) => dispatch(duplicateDesignLayer({ view, id }))}
          onDelete={(id) => dispatch(removeDesignLayer({ view, id }))}
          onReorder={(id, direction) => dispatch(reorderDesignLayer({ view, id, direction }))}
        />
        <PropertiesPanel
          layer={selectedLayer}
          onChange={(changes) => {
            dispatch(updateDesignLayer({ view, id: selectedLayer.id, changes }));
            dispatch(commitDesignLayer());
          }}
        />
      </div>
    </div>
  );
}

function ToolButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium text-zinc-600 transition-colors hover:bg-surface hover:text-primary"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
