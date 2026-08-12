"use client";

import { useEffect, useRef } from "react";
import { Stage, Layer, Text, Rect, Circle, RegularPolygon, Star, Image as KonvaImage, Transformer } from "react-konva";
import { useHtmlImage } from "../../../lib/useHtmlImage";

const STAGE_WIDTH = 320;
const STAGE_HEIGHT = 360;

function ImageLayerNode({ layer, shared }) {
  const image = useHtmlImage(layer.src);
  return <KonvaImage image={image} {...shared} />;
}

function ShapeLayerNode({ layer, shared }) {
  const { width, height } = layer;
  if (layer.shapeType === "circle") {
    return <Circle {...shared} radius={width / 2} fill={layer.fill} width={width} height={height} />;
  }
  if (layer.shapeType === "triangle") {
    return <RegularPolygon {...shared} sides={3} radius={width / 2} fill={layer.fill} width={width} height={height} />;
  }
  if (layer.shapeType === "star") {
    return (
      <Star
        {...shared}
        numPoints={5}
        innerRadius={width / 4}
        outerRadius={width / 2}
        fill={layer.fill}
        width={width}
        height={height}
      />
    );
  }
  return <Rect {...shared} width={width} height={height} fill={layer.fill} cornerRadius={4} />;
}

export default function DesignCanvasStage({ layers, selectedLayerId, onSelect, onChange, onCommit }) {
  const transformerRef = useRef(null);
  const nodeRefs = useRef({});

  useEffect(() => {
    const transformer = transformerRef.current;
    const node = nodeRefs.current[selectedLayerId];
    if (transformer && node) {
      transformer.nodes([node]);
      transformer.getLayer()?.batchDraw();
    } else if (transformer) {
      transformer.nodes([]);
    }
  }, [selectedLayerId, layers]);

  return (
    <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT} className="absolute inset-0">
      <Layer>
        {layers
          .filter((layer) => layer.visible !== false)
          .map((layer) => {
            const shared = {
              ref: (node) => {
                if (node) nodeRefs.current[layer.id] = node;
              },
              x: layer.x,
              y: layer.y,
              rotation: layer.rotation || 0,
              opacity: layer.opacity ?? 1,
              draggable: !layer.locked,
              onClick: () => onSelect(layer.id),
              onTap: () => onSelect(layer.id),
              onDragEnd: (e) => {
                onChange(layer.id, { x: e.target.x(), y: e.target.y() });
                onCommit();
              },
              onTransformEnd: (e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                onChange(layer.id, {
                  x: node.x(),
                  y: node.y(),
                  rotation: node.rotation(),
                  width: Math.max(10, layer.width * scaleX),
                  height: Math.max(10, layer.height * scaleY),
                });
                onCommit();
              },
            };

            if (layer.type === "text") {
              return (
                <Text
                  key={layer.id}
                  {...shared}
                  text={layer.text}
                  fontSize={layer.fontSize}
                  fontFamily={layer.fontFamily || "sans-serif"}
                  fontStyle={layer.fontWeight === "bold" ? "bold" : "normal"}
                  fill={layer.fill}
                  width={layer.width}
                />
              );
            }
            if (layer.type === "image") {
              return <ImageLayerNode key={layer.id} layer={layer} shared={{ ...shared, width: layer.width, height: layer.height }} />;
            }
            return <ShapeLayerNode key={layer.id} layer={layer} shared={shared} />;
          })}
        <Transformer ref={transformerRef} rotateEnabled flipEnabled={false} />
      </Layer>
    </Stage>
  );
}

export { STAGE_WIDTH, STAGE_HEIGHT };
