import { rgbToHex } from "@/libs/RgbToHex";
import { Color } from "@/props/CanvasProps";
import React from "react";

const AllColors: Color[] = [
  { r: 243, g: 82, b: 35 },
  { r: 255, g: 249, b: 177 },
  { r: 68, g: 202, b: 99 },
  { r: 39, g: 142, b: 237 },
  { r: 155, g: 105, b: 245 },
  { r: 252, g: 142, b: 42 },
  { r: 0, g: 0, b: 0 },
  { r: 255, g: 255, b: 255 },
];

// Color picker props
interface SelectionToolColorPickerProps {
  onChange: (color: Color) => void;
}

// Color picker Component
const SelectionToolColorPicker: React.FC<SelectionToolColorPickerProps> = ({
  onChange,
}) => {
  return (
    <div className="grid grid-cols-4 gap-1.5 px-0.5 items-center max-w-44">
      {AllColors.map((color: Color, index) => (
        <button
          key={index}
          className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
          onClick={() => onChange(color)}
        >
          <div
            className="h-8 w-8 rounded-md shadow-lg border border-neutral-300"
            style={{ backgroundColor: rgbToHex(color) }}
          ></div>
        </button>
      ))}
    </div>
  );
};

export default SelectionToolColorPicker;
