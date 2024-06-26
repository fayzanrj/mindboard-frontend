"use client";
import useUserId from "@/hooks/useUserId";
import GroupProps from "@/props/GroupProps";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

// Props
interface SelectionListItemProps extends GroupProps {
  handleClick: () => void;
  variant: "SELECTED" | "OPTION";
  selectedGroupId?: string;
}

const SelectionListItem: React.FC<SelectionListItemProps> = ({
  _id,
  image,
  name,
  admin,
  handleClick,
  variant,
  selectedGroupId,
}) => {
  // Currently logged in used ID
  const currentUserId = useUserId();

  return (
    <button
      className={`w-full h-14 px-1.5 rounded-lg flex justify-start items-center gap-2 relative cursor-pointer ${
        variant === "SELECTED" ? "border-2" : "border-0"
      }`}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white relative">
        {image ? (
          <Image src={image} alt="group-image" width={20} height={20} />
        ) : (
          <span className="CENTER">{name && name[0].toUpperCase()}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 text-nowrap text-ellipsis overflow-hidden">
        <p className="text-ellipsis font-semibold text-left overflow-hidden">
          {name}
        </p>

        {/* Member type */}
        {variant === "OPTION" && (
          <p className="text-left text-xs text-stone-500">
            {currentUserId === admin._id ? "Admin" : "Member"}
          </p>
        )}
      </div>

      {/* Drop down icon */}
      {variant === "SELECTED" && (
        <ChevronUpDownIcon className="h-6 w-6 text-gray-500" />
      )}

      {/* Selected icon */}
      {selectedGroupId === _id && variant !== "SELECTED" && (
        <button className="h-5 w-5 rounded-full bg-[#162453]">
          <CheckIcon className="h-4 w-4 text-white mx-auto" />
        </button>
      )}
    </button>
  );
};

export default SelectionListItem;
