"use client";
import useUserId from "@/hooks/useUserId";
import getLastEditedTime from "@/libs/GetLastEditedTime";
import { handleApiError } from "@/libs/handleApiError";
import BoardProps from "@/props/BoardProps";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import clipboardCopy from "clipboard-copy";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import BoardEditNameModal from "../modals/BoardEditNameModal";
import DeletionConfirmationModal from "../modals/DeletionConfirmationModal";
import BoardListItemMenu from "./BoardListItemMenu";

const BoardListItem: React.FC<BoardProps> = ({
  _id,
  image,
  name,
  isFavOf,
  group,
  lastUpdatedBy,
  createdBy,
  createdAt,
  updatedAt,
}) => {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // Hooks
  const currentUserId = useUserId();

  // to open and close all modals
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleEditNameModal = () => setIsEditOpen(!isEditOpen);
  const toggleDeleteModal = () => setIsDeleteOpen(!isDeleteOpen);

  // Function to copy board link to clipboard
  const copyLink = async () => {
    const link = `${process.env.NEXT_PUBLIC_HOST_URL}/board/${_id}`;

    try {
      clipboardCopy(link);
      toast.success("Link Copied");
    } catch (error) {
      toast.error("Failed to copy, you can open board and copy url");
    } finally {
      toggleMenu(); // closing menu
    }
  };

  // Function to delete board
  const deleteItem = async () => {
    // Only the one who created the board OR admin can delete it
    if (
      createdBy._id === currentUserId ||
      group.admin.toString() === currentUserId
    ) {
      try {
        // API CALL
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/board/deleteBoard/${_id}?requestingUserId=${currentUserId}`,
          {
            headers: {
              accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        handleApiError(error);
      }
    } else {
      toast.error("Unauthorized");
    }
  };

  return (
    <>
      {/* Modal to confirm deletion of the board */}
      {isDeleteOpen && (
        <DeletionConfirmationModal
          variant="Board"
          closeModal={toggleDeleteModal}
          deleteItem={deleteItem}
        />
      )}

      {/* Modal to enter new name of the selected board and upadating it */}
      {isEditOpen && (
        <BoardEditNameModal
          closeModal={toggleEditNameModal}
          boardId={_id}
          name={name}
          isAuthorized={
            createdBy._id === currentUserId ||
            group.admin.toString() === currentUserId
          }
        />
      )}

      {/* Board list item */}
      <Link
        href={`/board/${_id}`}
        className="group aspect-[100/127] border border-gray-100 shadow-md rounded-xl overflow-hidden cursor-pointer"
        // Closing menu
        onMouseLeave={() => setIsMenuOpen(false)}
        onTouchEnd={() => setIsMenuOpen(false)}
      >
        {/* Top */}
        <div className="relative w-full h-[calc(100%_-_3rem)] bg-amber-50">
          {/* Image */}
          <Image
            src={`/placeholders/${image}`}
            alt="placeholder"
            fill
            className="w-full h-full object-center"
          />

          {/* Overlay */}
          <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black z-10" />

          {/* Menu button */}
          <button
            className="absolute right-1 top-2 select-none outline-none"
            // Opening menu on click
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <EllipsisVerticalIcon className="h-7 w-7 text-neutral-700 group-hover:text-white duration-300 z-20" />
          </button>

          {/* Menu */}
          {isMenuOpen && (
            <BoardListItemMenu
              copyLink={copyLink}
              openNameEditMenu={toggleEditNameModal}
              openDeleteModal={toggleDeleteModal}
              showActionButtons={
                createdBy._id === currentUserId ||
                group.admin.toString() === currentUserId
              }
            />
          )}
        </div>

        {/* Info */}
        <div className="min-h-12 max-h-20 h-1/6 px-3 w-full  py-0.5 border-t flex">
          <div className="flex-1 overflow-hidden ">
            {/* Board Name */}
            <p className="font-semibold tracking-tight text-nowrap text-ellipsis overflow-hidden">
              {name}
            </p>

            {/* Person who last updated board his name and time */}
            <p className="text-[0.65rem] text-gray-600 text-nowrap text-ellipsis overflow-hidden">
              {lastUpdatedBy ? lastUpdatedBy.firstName : createdBy.firstName}
              <span className="">
                {getLastEditedTime(lastUpdatedBy ? createdAt : updatedAt)}
              </span>
            </p>
          </div>
          {
            // TODO : Connect to backend api
            //  <FavButton boardId={_id} fav={isFavOf.includes(currentUserId)} />
          }
        </div>
      </Link>
    </>
  );
};

export default BoardListItem;
