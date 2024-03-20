"use client";
import React, { useState } from "react";
import ModalLayout from "../shared/modal/ModalLayout";
import ModalInputField from "../shared/modal/ModalInputField";
import ModalButton from "../shared/modal/ModalButton";

// Props
interface CreateBoardModalProps {
  closeModal: () => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({ closeModal }) => {
  const [boardName, setBoardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <ModalLayout
      isLoading={isLoading}
      closeModal={closeModal}
      heading="New board"
    >
      <form className="my-10 px-4" onSubmit={handleSubmit}>
        <ModalInputField
          label="Board name"
          id="boardName"
          placeHolder="Enter new board name"
          value={boardName}
          setValue={setBoardName}
        />

        <ModalButton disabled={isLoading || !boardName}>
          CREATE BOARD
        </ModalButton>
      </form>
    </ModalLayout>
  );
};

export default CreateBoardModal;
