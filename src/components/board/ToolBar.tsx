"use client";
import { CanvasMode, CanvasState, Color, LayerType } from "@/props/CanvasProps";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  LuCircle,
  LuPencil,
  LuRedo2,
  LuSpellCheck,
  LuSquare,
  LuStickyNote,
  LuUndo2,
} from "react-icons/lu";
import { TfiLocationArrow } from "react-icons/tfi";
import ColorPicker from "./ColorPicker";
import ToolButton from "./ToolButton";

// Props
interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: React.Dispatch<React.SetStateAction<CanvasState>>;
  lastUsedColor: Color;
  setLastUsedColor: React.Dispatch<React.SetStateAction<Color>>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({
  canvasState,
  setCanvasState,
  canRedo,
  canUndo,
  redo,
  undo,
  setLastUsedColor,
  lastUsedColor,
}) => {
  // State
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-3">
      <div
        className={`w-12 p-1.5 mb-1 bg-white shadow-lg rounded-md drop-shadow transition ${
          isOpen && "rotate-180"
        }`}
      >
        <ToolButton
          id="select"
          Icon={IoIosArrowBack}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {
        <div
          className={`${
            isOpen ? " -translate-x-[140%]" : "translate-x-0"
          } transition`}
        >
          <div className="w-12 p-1.5 mb-1 min-h-56 bg-white shadow-lg rounded-md drop-shadow">
            <ToolButton
              id="select"
              Icon={TfiLocationArrow}
              onClick={() =>
                setCanvasState({
                  mode: CanvasMode.None,
                })
              }
              isActive={
                canvasState.mode === CanvasMode.None ||
                canvasState.mode === CanvasMode.Translating ||
                canvasState.mode === CanvasMode.SelectionNet ||
                canvasState.mode === CanvasMode.Pressing ||
                canvasState.mode === CanvasMode.Resizing
              }
            />
            <ToolButton
              id="text"
              Icon={LuSpellCheck}
              onClick={() =>
                setCanvasState({
                  mode: CanvasMode.Inserting,
                  layerType: LayerType.Text,
                })
              }
              isActive={
                canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Text
              }
            />
            <ToolButton
              id="note"
              Icon={LuStickyNote}
              onClick={() =>
                setCanvasState({
                  mode: CanvasMode.Inserting,
                  layerType: LayerType.Note,
                })
              }
              isActive={
                canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Note
              }
            />
            <ToolButton
              id="rectangle"
              Icon={LuSquare}
              onClick={() =>
                setCanvasState({
                  mode: CanvasMode.Inserting,
                  layerType: LayerType.Rectangle,
                })
              }
              isActive={
                canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Rectangle
              }
            />
            <ToolButton
              id="ellipse"
              Icon={LuCircle}
              onClick={() =>
                setCanvasState({
                  mode: CanvasMode.Inserting,
                  layerType: LayerType.Ellipse,
                })
              }
              isActive={
                canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Ellipse
              }
            />
            <ToolButton
              id="pencil"
              Icon={LuPencil}
              onClick={() =>
                setCanvasState({
                  mode: CanvasMode.Pencil,
                })
              }
              isActive={canvasState.mode === CanvasMode.Pencil}
            />

            {/* Color picker */}
            <ColorPicker color={lastUsedColor} setColor={setLastUsedColor} />
          </div>

          <div className="w-12 p-1 min-h-20 bg-white shadow-lg rounded-md drop-shadow">
            <ToolButton
              id="undo"
              Icon={LuUndo2}
              onClick={undo}
              isDisabled={!canUndo}
            />
            <ToolButton
              id="redo"
              Icon={LuRedo2}
              onClick={redo}
              isDisabled={!canRedo}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default ToolBar;
