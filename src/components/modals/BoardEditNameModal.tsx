"use client";
import useUserId from "@/hooks/useUserId";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import ModalButton from "./layout/ModalButton";
import ModalInputField from "./layout/ModalInputField";
import ModalLayout from "./layout/ModalLayout";

// Props
interface BoardEditNameModalProps {
  closeModal: () => void;
  boardId: string;
  name: string;
  isAuthorized: boolean;
}

const BoardEditNameModal: React.FC<BoardEditNameModalProps> = ({
  closeModal,
  boardId,
  name,
  isAuthorized,
}) => {
  // States
  const [newName, setNewName] = useState(name);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserId = useUserId();
  // Hooks
  const router = useRouter();

  // Form submission
  const updateName = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (isAuthorized) {
        // API CALL
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/board/updateName/${boardId}?requestingUserId=${currentUserId}`,
          { newName },
          {
            headers: {
              accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
            },
          }
        );

        toast.success(response.data.message);
        // Refreshing page to fetch latest data
        router.refresh();
        // Closing edit name modal
        closeModal();
      } else {
        toast.error("Unauthorized");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout
      closeModal={closeModal}
      heading="Edit Board Name"
      isLoading={isLoading}
    >
      <form onSubmit={updateName} className="my-10 px-4">
        {/* Input field for new name */}
        <ModalInputField
          id="newName"
          label="New Name"
          placeHolder="Enter new name"
          value={newName}
          setValue={setNewName}
        />

        {/* Form submission button */}
        <ModalButton disabled={isLoading || name === newName}>
          UPDATE NAME
        </ModalButton>
      </form>
    </ModalLayout>
  );
};

export default BoardEditNameModal;
