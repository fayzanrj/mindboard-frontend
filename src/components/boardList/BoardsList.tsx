"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "sonner";
import BoardProps from "../../props/BoardProps";
import AddNewBoardButton from "./AddNewBoardButton";
import BoardListItem from "./BoardListItem";
import UserProps from "@/props/UserProps";
interface BoardsListProps {
  boards: BoardProps[];
  searchParams: {
    createdByUser: boolean;
  };
  groupId: string;
  currentUserId: string;
}

const BoardsList: React.FC<BoardsListProps> = ({
  boards,
  searchParams,
  groupId,
  currentUserId,
}) => {
  const [allBoards, setAllBoards] = useState(boards);

  useEffect(() => {
    // Joining room based on groupId
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    socket.emit("joinRoom", groupId);

    // Adding new board when boardcasted by the server
    socket.on("new-board", (board: BoardProps) => {
      if (board.createdBy._id !== currentUserId) {
        toast.message(
          `${board.createdBy.username} created a new board "${board.name}"`
        );
      }
      setAllBoards((prev) => [...prev, board]);
    });

    // Deleting a board
    socket.on("delete-board", (boardToDelete: BoardProps, user: UserProps) => {
      if (user._id !== currentUserId) {
        toast.message(
          `${user.username} deleted a board "${boardToDelete.name}"`
        );
      }
      setAllBoards((prev) =>
        prev.filter((board) => board._id !== boardToDelete._id)
      );
    });

    // updating board name
    socket.on(
      "updated-board-name",
      (updatedBoard: BoardProps, user: UserProps) => {
        const boardIndex = allBoards.findIndex(
          (board) => board._id === updatedBoard._id
        );

        if (boardIndex > -1) {
          if (user._id !== currentUserId) {
            toast.message(
              `${user.username} updated board "${allBoards[boardIndex].name}" to "${updatedBoard.name}"`
            );
          }

          setAllBoards((prev) =>
            prev.map((boardItem, index) =>
              index === boardIndex
                ? {
                    ...boardItem,
                    name: updatedBoard.name,
                    updatedAt: updatedBoard.updatedAt,
                    lastUpdatedBy: updatedBoard.lastUpdatedBy,
                  }
                : boardItem
            )
          );
        }
      }
    );

    // Cleanup: Leaving room and disconnecting socket when component unmounts
    return () => {
      socket.emit("leaveRoom", groupId);
      socket.disconnect();
      console.log(`${groupId} left`);
    };
  }, [groupId]);

  return (
    <div className="p-8">
      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl font-bold">
        {searchParams.createdByUser ? "Created by You" : "Team Boards"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-8 pb-10">
        <AddNewBoardButton />

        {allBoards.map((board) => {
          if (searchParams.createdByUser) {
            if (board.createdBy._id === currentUserId) {
              return <BoardListItem key={board._id} {...board} />;
            }
          } else {
            return <BoardListItem key={board._id} {...board} />;
          }
        })}
      </div>
    </div>
  );
};

export default BoardsList;
