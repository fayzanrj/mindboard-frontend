"use client";
import useUserId from "@/hooks/useUserId";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import ModalButton from "./layout/ModalButton";
import ModalInputField from "./layout/ModalInputField";
import ModalLayout from "./layout/ModalLayout";

// Props
interface CreateBoardModalProps {
  closeModal: () => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ closeModal }) => {
  // States
  const [boardName, setBoardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Hooks
  const currentUserId = useUserId();
  const params = useParams();
  const router = useRouter();

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);

      const board = {
        name: boardName,
        createdBy: currentUserId,
        image: `${Math.floor(Math.random() * 10) + 1}.svg`,
      };

      // API CALL
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/board/createBoard/${params.groupId}?requestingUserId=${currentUserId}`,
        { board },
        {
          headers: {
            accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
          },
        }
      );
      toast.success(response.data.message);
      // Refreshing page to fetch latest data
      router.refresh();
      // Closing create board modal
      closeModal();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout
      isLoading={isLoading}
      closeModal={closeModal}
      heading="New board"
    >
      <form className="my-10 px-4" onSubmit={handleSubmit}>
        {/* Inout field for board name */}
        <ModalInputField
          label="Board name"
          id="boardName"
          placeHolder="Enter new board name"
          value={boardName}
          setValue={setBoardName}
        />

        {/* Submission button */}
        <ModalButton disabled={isLoading || !boardName}>
          CREATE BOARD
        </ModalButton>
      </form>
    </ModalLayout>
  );
};

export default CreateBoardModal;
