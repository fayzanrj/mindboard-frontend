"use client";
import { handleApiError } from "@/libs/handleApiError";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalLayout from "./layout/ModalLayout";

// Props
interface DeletionConfirmationModalProps {
  closeModal: () => void;
  deleteItem: () => void;
  variant: "Board" | "Group";
}

const DeletionConfirmationModal: React.FC<DeletionConfirmationModalProps> = ({
  closeModal,
  deleteItem,
  variant,
}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  // Hook
  const router = useRouter();

  // Handling deleteion button click
  const handleClick = async () => {
    try {
      setIsLoading(true);
      // Deletion function
      await deleteItem();

      // Closing modal
      closeModal();
      // Refreshing page to fetch latest data
      router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ModalLayout
      closeModal={closeModal}
      heading="Deletion Confirmation"
      isLoading={isLoading}
    >
      <div className="py-10 px-4">
        <h3 className="text-lg ">
          Do you really wish to delete this {variant}?
        </h3>
        <p className="text-sm font-bold my-2">This action is irreversible</p>

        <div className="text-right mt-6">
          {/* Cancel button */}
          <button className="mx-1 py-1 px-1 rounded-lg" onClick={closeModal}>
            Cancel
          </button>
          {/* Delete button */}
          <button
            className="mx-1 text-white py-1.5 px-4 rounded-lg bg-red-600"
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeletionConfirmationModal;
