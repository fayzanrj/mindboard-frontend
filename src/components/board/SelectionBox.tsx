"use client";
import { LayerType, Side, XYWH } from "@/props/CanvasProps";
import React, { memo } from "react";
import { useSelf, useStorage } from "../../../liveblocks.config";
import useSelectionBounds from "@/hooks/useSelectionBounds";

// Props
interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

// Selection resize squares width
const HANDLE_WIDTH = 6;

const SelectionBox: React.FC<SelectionBoxProps> = memo(
  ({ onResizeHandlePointerDown }) => {
    // Getting the user's selected first layer from selection array to resize
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    // Cheking if selected layer's layertype is not path i.e. pen
    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    // Getting new coordinates everytime the size of the selected layers sizes
    const bounds = useSelectionBounds();

    if (!bounds) return null;

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{
            transform: `translate(${bounds.x}px , ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />

        {isShowingHandles && (
          <>
            {/* Top left */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px , ${
                  bounds.y - HANDLE_WIDTH / 2
                }px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
              }}
            />

            {/* Top middle */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width! / 2 - HANDLE_WIDTH / 2
                }px , ${bounds.y - HANDLE_WIDTH / 2}px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Top, bounds);
              }}
            />

            {/* Top right */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "ne-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width! - HANDLE_WIDTH / 2
                }px , ${bounds.y - HANDLE_WIDTH / 2}px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
              }}
            />

            {/* Middle left */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px , ${
                  bounds.y + bounds.height! / 2 - HANDLE_WIDTH / 2
                }px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Left, bounds);
              }}
            />

            {/* Middle right */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width! - HANDLE_WIDTH / 2
                }px , ${bounds.y + bounds.height! / 2 - HANDLE_WIDTH / 2}px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Right, bounds);
              }}
            />

            {/* Bottom left */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "ne-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px , ${
                  bounds.y + bounds.height! - HANDLE_WIDTH / 2
                }px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
              }}
            />

            {/* Bottom middle */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width! / 2 - HANDLE_WIDTH / 2
                }px , ${bounds.y + bounds.height! - HANDLE_WIDTH / 2}px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
            />

            {/* Bottom right */}
            <rect
              className="fill-white stroke-blue-500 stroke-1"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width! - HANDLE_WIDTH / 2
                }px , ${bounds.y + bounds.height! - HANDLE_WIDTH / 2}px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
              }}
            />
          </>
        )}
      </>
    );
  }
);

export default SelectionBox;

SelectionBox.displayName = "Selection Box";
