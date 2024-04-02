"use client";

import useUserId from "@/hooks/useUserId";
import BoardProps from "@/props/BoardProps";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { toast } from "sonner";

// Props
interface FavButtonProps {
  boardId: string;
  fav: boolean;
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>;
}

const FavButton: React.FC<FavButtonProps> = ({ boardId, fav, setBoards }) => {
  const [isFav, setIsFav] = useState(fav);
  const [isDisabled, setIsDisabled] = useState(false);
  const currentUserId = useUserId();

  // Function to update the board's favorite status in boards list
  const updateBoards = (query: "Add" | "Remove", boardId: string) => {
    setBoards((prev) => {
      const index = prev.findIndex((board) => board._id === boardId);

      if (index === -1) {
        // Returning previous state if board is not found
        return prev;
      }

      const updatedBoards = [...prev];

      if (query === "Add") {
        // Adding user to the board's favorites
        updatedBoards[index].isFavOf.push(currentUserId);
      } else if (query === "Remove") {
        // Removing user from the board's favorites
        const userIdIndex = updatedBoards[index].isFavOf.indexOf(currentUserId);
        if (userIdIndex !== -1) {
          updatedBoards[index].isFavOf.splice(userIdIndex, 1);
        }
      }

      return updatedBoards;
    });
  };

  // Updating local state when the prop changes
  useLayoutEffect(() => {
    setIsFav(fav);
  }, [fav]);

  // Function to toggle the favorite status of a board
  const toggleFav = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    const oldState = isFav;

    const query = oldState ? "removeFromFav" : "addToFav"; // Determining the API endpoint

    try {
      setIsFav(!oldState);

      // API CALL
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/board/${query}/${boardId}?requestingUserId=${currentUserId}`,
        {},
        {
          headers: {
            accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
          },
        }
      );

      toast.success(response.data.message);
      updateBoards(oldState ? "Remove" : "Add", boardId); // Update boards list
    } catch (error) {
      console.error(error);
      setIsFav(oldState); // Revert to the old state if error occurs
      updateBoards(oldState ? "Add" : "Remove", boardId); // Update boards list
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="py-1.5">
      <button className="h-fit" onClick={toggleFav} disabled={isDisabled}>
        <StarIcon
          className={`h-6 w-6 ${isFav ? "text-blue-600" : "text-slate-300"}`}
        />
      </button>
    </div>
  );
};

export default FavButton;
