"use client";
import { rgbToHex } from "@/libs/RgbToHex";
import { Color } from "@/props/CanvasProps";
import { SketchPicker } from "react-color";
import React, { useState } from "react";

//Props
interface ColorPickerProps {
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open rgb color picker
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className=" w-full text-center h-9 py-1.5 disabled:opacity-20 relative">
      {isModalOpen && (
        <SketchPicker
          className="absolute -bottom-1.5 left-14"
          color={color}
          disableAlpha
          onChange={(e) => {
            setColor({
              r: e.rgb.r,
              g: e.rgb.g,
              b: e.rgb.b,
            });
          }}
        />
      )}

      {/* Color button */}
      <button
        onClick={toggleModal}
        className="w-6 h-6 rounded-full mx-auto border"
        style={{ backgroundColor: rgbToHex(color) }}
      ></button>
    </div>
  );
};

export default ColorPicker;
