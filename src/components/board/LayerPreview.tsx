"use client";
import React from "react";
import { useStorage } from "../../../liveblocks.config";
import { LayerType } from "@/props/CanvasProps";
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import Text from "./Text";
import Note from "./Note";
import Path from "./Path";
import { rgbToHex } from "@/libs/RgbToHex";
import { toast } from "sonner";

// Props
interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor: string;
}

const LayerPreview: React.FC<LayerPreviewProps> = ({
  id,
  onLayerPointerDown,
  selectionColor,
}) => {
  // Getting the current layer
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  // Switch case to detername which element to render based on the layer type of the layer
  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? rgbToHex(layer.fill) : "#000"}
          stroke={selectionColor}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );

    default:
      toast.error("Unkown tool");
  }
};

export default LayerPreview;
