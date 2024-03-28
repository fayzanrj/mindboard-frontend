import { Camera } from "@/props/CanvasProps";
import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";

// Props
interface CanvasDragButtonsProps {
  setCamera: React.Dispatch<React.SetStateAction<Camera>>;
}

// Side props
type SideType = "Up" | "Down" | "Right" | "Left";

// Component
const CanvasDragButtons: React.FC<CanvasDragButtonsProps> = ({ setCamera }) => {
  // State
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // Function to handle movement based on side
  const handleMovement = (side: SideType) => {
    switch (side) {
      case "Up":
        setCamera((prevCamera) => ({ ...prevCamera, y: prevCamera.y + 10 }));
        break;
      case "Down":
        setCamera((prevCamera) => ({ ...prevCamera, y: prevCamera.y - 10 }));
        break;
      case "Right":
        setCamera((prevCamera) => ({ ...prevCamera, x: prevCamera.x - 10 }));
        break;
      case "Left":
        setCamera((prevCamera) => ({ ...prevCamera, x: prevCamera.x + 10 }));
        break;
      default:
        break;
    }
  };

  const handleMouseDown = (side: SideType) => {
    // Moving the camera
    handleMovement(side);

    // Setting a timer for long press
    const timer = setTimeout(() => {
      setLongPressTimer(null);
      setLongPressTimer(setInterval(() => handleMovement(side), 50));
    }, 500);

    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      // stopping interval
      clearInterval(longPressTimer);
      setLongPressTimer(null);
    }
  };

  // Handle touch start event
  const handleTouchStart = (side: SideType) => {
    // Moving the camera
    handleMovement(side);

    // Setting a timer for long press
    const timer = setTimeout(() => {
      setLongPressTimer(null);
      setLongPressTimer(setInterval(() => handleMovement(side), 50));
    }, 500);

    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearInterval(longPressTimer);
      setLongPressTimer(null);
    }
  };

  return (
    <div className="absolute w-32 top-[110%] right-3 text-center select-none">
      {/* Up button */}
      <CanvasMoveButtonItem
        id="Up"
        Icon={IoIosArrowUp}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* Left and Right buttons */}
      <div className="flex justify-between">
        <CanvasMoveButtonItem
          id="Left"
          Icon={IoIosArrowBack}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />

        <CanvasMoveButtonItem
          id="Right"
          Icon={IoIosArrowForward}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Down button */}
      <CanvasMoveButtonItem
        id="Down"
        Icon={IoIosArrowDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default CanvasDragButtons;

// Button Item props
interface CanvasMoveButtonItemProps {
  id: SideType;
  Icon: IconType;
  onMouseDown: (side: SideType) => void;
  onMouseUp: () => void;
  onTouchStart: (side: SideType) => void;
  onTouchEnd: () => void;
}

// Button item component
const CanvasMoveButtonItem: React.FC<CanvasMoveButtonItemProps> = ({
  id,
  Icon,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}) => (
  <button
    className="mx-auto h-8 w-8 text-center bg-white shadow-xl drop-shadow-lg rounded-md m-1 "
    onMouseDown={() => onMouseDown(id)}
    onMouseUp={onMouseUp}
    onTouchStart={() => onTouchStart(id)}
    onTouchEnd={onTouchEnd}
  >
    <Icon size={"1.2rem"} className="mx-auto" />
  </button>
);
