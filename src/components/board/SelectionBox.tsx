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

    const layer = useStorage(
      (root) => soleLayerId && root.layers.get(soleLayerId)
    );

    // If layer's type is a PATH i.e. pen then we will not resize it
    const isShowingHandles = layer && layer.type !== LayerType.Path;
    // If layer's type is a line then we will only resize it's x axis
    const showOnlyMiddleHandles = layer && layer.type === LayerType.Line;

    // Getting new coordinates everytime the size of the selected layers sizes
    const bounds = useSelectionBounds();

    // Selection box height and weight
    const boundsHeight = showOnlyMiddleHandles ? 3 : bounds?.height || 2;
    const boundsWidth = bounds?.width || 100;

    if (!bounds) return null;

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{
            transform: `translate(${bounds.x}px , ${bounds.y}px)`,
            paddingBottom: showOnlyMiddleHandles ? "1px" : 0,
          }}
          x={0}
          y={0}
          width={showOnlyMiddleHandles ? boundsWidth + 2 : boundsWidth}
          height={boundsHeight}
        />

        {isShowingHandles && (
          <>
            {/* Top left */}
            {!showOnlyMiddleHandles && (
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
            )}

            {/* Top middle */}

            {!showOnlyMiddleHandles && (
              <rect
                className="fill-white stroke-blue-500 stroke-1"
                x={0}
                y={0}
                style={{
                  cursor: "ns-resize",
                  width: `${HANDLE_WIDTH}px`,
                  height: `${HANDLE_WIDTH}px`,
                  transform: `translate(${
                    bounds.x + boundsWidth! / 2 - HANDLE_WIDTH / 2
                  }px , ${bounds.y - HANDLE_WIDTH / 2}px) `,
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();

                  onResizeHandlePointerDown(Side.Top, bounds);
                }}
              />
            )}

            {/* Top right */}

            {!showOnlyMiddleHandles && (
              <rect
                className="fill-white stroke-blue-500 stroke-1"
                x={0}
                y={0}
                style={{
                  cursor: "ne-resize",
                  width: `${HANDLE_WIDTH}px`,
                  height: `${HANDLE_WIDTH}px`,
                  transform: `translate(${
                    bounds.x + boundsWidth! - HANDLE_WIDTH / 2
                  }px , ${bounds.y - HANDLE_WIDTH / 2}px) `,
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();

                  onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
                }}
              />
            )}

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
                  bounds.y + boundsHeight! / 2 - HANDLE_WIDTH / 2
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
                  bounds.x + boundsWidth! - HANDLE_WIDTH / 2
                }px , ${bounds.y + boundsHeight! / 2 - HANDLE_WIDTH / 2}px) `,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();

                onResizeHandlePointerDown(Side.Right, bounds);
              }}
            />

            {/* Bottom left */}

            {!showOnlyMiddleHandles && (
              <rect
                className="fill-white stroke-blue-500 stroke-1"
                x={0}
                y={0}
                style={{
                  cursor: "ne-resize",
                  width: `${HANDLE_WIDTH}px`,
                  height: `${HANDLE_WIDTH}px`,
                  transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px , ${
                    bounds.y + boundsHeight! - HANDLE_WIDTH / 2
                  }px) `,
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
                }}
              />
            )}

            {/* Bottom middle */}

            {!showOnlyMiddleHandles && (
              <rect
                className="fill-white stroke-blue-500 stroke-1"
                x={0}
                y={0}
                style={{
                  cursor: "ns-resize",
                  width: `${HANDLE_WIDTH}px`,
                  height: `${HANDLE_WIDTH}px`,
                  transform: `translate(${
                    bounds.x + boundsWidth! / 2 - HANDLE_WIDTH / 2
                  }px , ${bounds.y + boundsHeight! - HANDLE_WIDTH / 2}px) `,
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onResizeHandlePointerDown(Side.Bottom, bounds);
                }}
              />
            )}

            {/* Bottom right */}
            {!showOnlyMiddleHandles && (
              <rect
                className="fill-white stroke-blue-500 stroke-1"
                x={0}
                y={0}
                style={{
                  cursor: "nwse-resize",
                  width: `${HANDLE_WIDTH}px`,
                  height: `${HANDLE_WIDTH}px`,
                  transform: `translate(${
                    bounds.x + boundsWidth! - HANDLE_WIDTH / 2
                  }px , ${bounds.y + boundsHeight! - HANDLE_WIDTH / 2}px) `,
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();

                  onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
                }}
              />
            )}
          </>
        )}
      </>
    );
  }
);

export default SelectionBox;

SelectionBox.displayName = "Selection Box";
