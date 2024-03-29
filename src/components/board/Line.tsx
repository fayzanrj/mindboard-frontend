import { rgbToHex } from "@/libs/RgbToHex";
import { Layer, LineLayer, RectangleLayer } from "@/props/CanvasProps"; // Updated import and interface name

// Props
interface LineProps {
  // Updated interface name
  id: string;
  layer: LineLayer | RectangleLayer; // Updated prop name
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Line = ({
  // Updated component name
  id,
  layer,
  onPointerDown,
  selectionColor,
}: LineProps) => {
  // Updated prop name
  // Destructuring
  const { x, y, width, height, fill } = layer; // Updated prop names

  // Calculate the start and end points of the line
  const x1 = x + width / 2;
  const y1 = y;
  const x2 = x + width / 2;
  const y2 = y + height;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        marginTop: "2px",
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={2}
      fill={fill ? rgbToHex(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Line;
