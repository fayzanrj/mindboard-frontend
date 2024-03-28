"use client";
import { TextLayer } from "@/props/CanvasProps";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "../../../liveblocks.config";
import { rgbToHex } from "@/libs/RgbToHex";

// Font
const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

// Font size calcuating
const calculateFontSize = (width: number, height: number) => {
  // TODO : ENV
  const maxFontSize = 96;
  const scaleFactor = 0.375;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

// Props
interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Text = ({ layer, onPointerDown, id, selectionColor }: TextProps) => {
  // Destructuring
  const { x, y, width, height, fill, value } = layer;

  // Updating value
  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  // on change function to handle text
  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  // This function is to ensure user does not leave text layer empty because if text layer is empty then it will become invisible
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.innerHTML === "" && updateValue("Text");
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        html={value || "text"}
        onBlur={handleBlur}
        onChange={handleContentChange}
        className={`h-fit w-fit flex items-center justify-center text-center outline-none ${font.className}`}
        style={{
          fontSize: calculateFontSize(width, height),

          color: fill ? rgbToHex(fill) : "#000",
        }}
        spellCheck={false}
      />
    </foreignObject>
  );
};

export default Text;
