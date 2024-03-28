"use client";
import useUserId from "@/hooks/useUserId";
import { handleApiError } from "@/libs/handleApiError";
import BoardProps from "@/props/BoardProps";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BoardEditNameModal from "../modals/BoardEditNameModal";
import Link from "next/link";

const RoomInfo = () => {
  // States
  const [boardInfo, setBoardInfo] = useState<BoardProps>();
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);
  // Hooks
  const params = useParams();
  const currentUserId = useUserId();

  useEffect(() => {
    const fetchBoard = async () => {
      if (!isEditNameOpen) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/board/getboard/${params.boardId}?requestingUserId=${currentUserId}`,
            {
              headers: {
                accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
              },
            }
          );
          setBoardInfo(response.data.board);
        } catch (error) {
          handleApiError(error);
        }
      }
    };

    fetchBoard();
  }, [isEditNameOpen, currentUserId, params.boardId]);

  // Opening name change modal
  const toggleModal = () => setIsEditNameOpen(!isEditNameOpen);

  return (
    <>
      {boardInfo && isEditNameOpen && (
        <BoardEditNameModal
          boardId={boardInfo?._id!}
          closeModal={toggleModal}
          name={boardInfo?.name!}
          isAuthorized
        />
      )}
      <div className="min-w-48 h-11 bg-white shadow-lg rounded-md drop-shadow flex items-center px-2">
        <Link href={"/dashboard"}>
          <Image
            src={"/logo.png"}
            alt="log"
            width={120}
            height={40}
            className="w-16 h-8"
          />
        </Link>

        <p className="mx-2">|</p>

        <button onClick={toggleModal}>
          <p>{boardInfo?.name}</p>
        </button>
      </div>
    </>
  );
};

export default RoomInfo;
