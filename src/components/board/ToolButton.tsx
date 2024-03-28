"use client";
import React from "react";
import { IconType } from "react-icons";

// Props
interface ToolButtonProps {
  id: string;
  Icon: IconType;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

const ToolButton: React.FC<ToolButtonProps> = ({
  id,
  Icon,
  isActive,
  isDisabled,
  onClick,
}) => {
  return (
    <button
      id={id}
      disabled={isDisabled}
      onClick={onClick}
      className={`hover:bg-[rgba(0,0,0,0.2)] rounded-md w-full text-center h-9 disabled:opacity-20 ${
        isActive ? "bg-[rgba(111,182,255,0.4)]" : "bg-transparent"
      }`}
    >
      <Icon
        size={id === "select" || id === "text" ? "1.55rem" : "1.4rem"}
        className="mx-auto"
      />
    </button>
  );
};

export default ToolButton;
