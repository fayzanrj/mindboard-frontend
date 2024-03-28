"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface FavButtonProps {
  boardId: string;
  fav: boolean;
}
// TODO : YE TO WORK ON IT

const FavButton: React.FC<FavButtonProps> = ({ boardId, fav }) => {
  const [isFav, setIsFav] = useState(fav);

  const toggleFav = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // setIsFav(!isFav);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div className="py-1.5">
      <button className="h-fit" onClick={toggleFav}>
        <StarIcon
          className={`h-6 w-6 ${isFav ? "text-blue-600" : "text-slate-300"}`}
        />
      </button>
    </div>
  );
};

export default FavButton;
