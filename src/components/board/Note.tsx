"use client";
import { rgbToHex } from "@/libs/RgbToHex";
import { Color, NoteLayer } from "@/props/CanvasProps";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "../../../liveblocks.config";

// Function to get text color so the note bg color and text color cannot same
const getContrastingTextColor = (color: Color) => {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
};

// Font
const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

// Font size calculator
const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

// Props
interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Note = ({ layer, onPointerDown, id, selectionColor }: NoteProps) => {
  // Destructuring
  const { x, y, width, height, fill, value } = layer;

  // Updating layer value
  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  // handling text change
  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  // This function is to ensure user does not leave note layer empty because if note layer is empty then it will become same as rectangle
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.innerHTML === "" && updateValue("Enter text");
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? rgbToHex(fill) : "#000",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || ""}
        onBlur={handleBlur}
        onChange={handleContentChange}
        className={`h-full w-full flex items-center justify-center text-center outline-none ${font.className}`}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
        spellCheck={false}
      />
    </foreignObject>
  );
};

export default Note;
