"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CreateBoardModal from "./CreateBoardModal";

const AddNewBoardButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      {/* Button to add name of new board and create itF */}
      {isModalOpen && <CreateBoardModal closeModal={toggleModal} />}
      {/* New board button */}
      <button
        onClick={toggleModal}
        className={
          "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800"
        }
      >
        <PlusIcon className="h-12 w-12 text-white stroke-1 mx-auto" />
        <p className="text-sm text-white font-light">New board</p>
      </button>
    </>
  );
};

export default AddNewBoardButton;
