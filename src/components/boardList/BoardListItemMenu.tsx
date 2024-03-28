"use client";
import { LinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import BoardMenuItem from "./BoardMenuItem";

const stopDefault = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
  e.preventDefault();
  e.stopPropagation();
};

// Menu Props
interface BoardListItemMenuProps {
  openNameEditMenu: () => void;
  openDeleteModal: () => void;
  copyLink: () => void;
  showActionButtons: boolean;
}

// Menu
const BoardListItemMenu: React.FC<BoardListItemMenuProps> = ({
  openDeleteModal,
  openNameEditMenu,
  copyLink,
  showActionButtons,
}) => {
  return (
    <>
      <div
        className=" w-10/12 text-sm bg-white z-30 absolute top-6 left-[6%] py rounded-lg shadow-lg overflow-hidden select-none"
        // This function is to stop propogation
        onClick={stopDefault}
        onTouchStart={stopDefault}
      >
        <ul>
          {/* Copy link menu item */}
          <BoardMenuItem
            label="Copy board link"
            Icon={LinkIcon}
            action={copyLink}
          />

          {/* Edit name menu item */}
          {showActionButtons && (
            <BoardMenuItem
              label="Rename"
              Icon={PencilIcon}
              action={openNameEditMenu}
            />
          )}

          {/*Delete board menu item */}
          {showActionButtons && (
            <BoardMenuItem
              label="Delete"
              Icon={TrashIcon}
              action={openDeleteModal}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default BoardListItemMenu;
