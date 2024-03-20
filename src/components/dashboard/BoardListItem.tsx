"use client";
import BoardProps from "@/props/BoardProps";
import Image from "next/image";
import React from "react";
import FavButton from "./FavButton";
import getLastEditedTime from "@/libs/GetLastEditedTime";

const BoardListItem: React.FC<BoardProps> = ({
  id,
  image,
  name,
  isFavOf,
  lastEditedBy,
}) => {
  return (
    <div className="group aspect-[100/127] border border-gray-100 shadow-md rounded-xl overflow-hidden cursor-pointer">
      {/* Image */}
      <div className="relative w-full h-[calc(100%_-_3rem)] bg-amber-50">
        {/* Image */}
        <Image
          src={`/placeholders/${image}`}
          alt="placeholder"
          fill
          className="w-full h-full object-center"
        />
        {/* Overlay */}
        <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black" />
      </div>

      {/* Info */}
      <div className="min-h-12 max-h-20 h-1/6 px-3 w-full  py-0.5 border-t flex">
        <div className="flex-1 overflow-hidden">
          <p className="font-semibold tracking-tight text-nowrap text-ellipsis overflow-hidden">
            {name}
          </p>
          <p className="text-xs text-gray-600 text-nowrap text-ellipsis overflow-hidden">
            {"You,"}
            <span className="text-[0.6rem]">
              {getLastEditedTime(lastEditedBy)}
            </span>
          </p>
        </div>

        <FavButton id={id} fav={false} />
      </div>
    </div>
  );
};

export default BoardListItem;
