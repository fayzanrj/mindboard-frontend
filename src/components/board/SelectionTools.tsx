"use client";
import useDeleteLayers from "@/hooks/useDeleteLayers";
import useSelectionBounds from "@/hooks/useSelectionBounds";
import { Camera, Color } from "@/props/CanvasProps";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { LuBringToFront, LuSendToBack } from "react-icons/lu";
import { useMutation, useSelf } from "../../../liveblocks.config";
import SelectionToolColorPicker from "./SelectionToolColorPicker";
import ToolButton from "./ToolButton";

// Props
interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: React.Dispatch<React.SetStateAction<Color>>;
}

const SelectionTools: React.FC<SelectionToolsProps> = ({
  camera,
  setLastUsedColor,
}) => {
  // Getting selected layers array
  const selection = useSelf((me) => me.presence.selection);
  // Hooks
  const deleteLayers = useDeleteLayers();
  const selectionBounds = useSelectionBounds();
  const x = selectionBounds?.width! / 2 + selectionBounds?.x! + camera.x;
  const y = selectionBounds?.y! + camera.y;

  // Function to increase z index of the layer i.e. bring it on top
  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");

      const indices: number[] = [];
      const arr = liveLayerIds.toImmutable();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        // moving all the selected layers on top
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection]
  );

  // Function to decrease z index of the layer i.e. bring it on back
  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");

      const indices: number[] = [];

      const arr = liveLayerIds.toImmutable();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        // moving all the selected arrays to back
        liveLayerIds.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i)
        );
      }
    },
    [selection]
  );

  // Function that changes color of the selected layers
  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [selection, setLastUsedColor]
  );

  if (!selectionBounds) {
    return null;
  }

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`,
      }}
    >
      <SelectionToolColorPicker onChange={setFill} />

      <div className="flex flex-col h-full gap-y-0.5 w-9">
        <ToolButton
          Icon={LuBringToFront}
          id="bringToFront"
          onClick={moveToFront}
        />
        <ToolButton Icon={LuSendToBack} id="sendToBack" onClick={moveToBack} />
      </div>

      <div className="flex justify-center items-center w-9">
        <ToolButton Icon={BsTrash} id="deleteLayer" onClick={deleteLayers} />
      </div>
    </div>
  );
};

export default SelectionTools;
