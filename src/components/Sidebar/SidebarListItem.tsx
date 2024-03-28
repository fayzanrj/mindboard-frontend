"use client";
import GroupProps from "@/props/GroupProps";
import Image from "next/image";
import React, { useState } from "react";
import GroupInfoModal from "../modals/GroupInfoModal";

const SidebarListItem: React.FC<GroupProps> = ({ _id, image, name }) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close group info modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <>
      {isModalOpen && <GroupInfoModal groupId={_id} closeModal={toggleModal} />}

      <button
        className="w-12 h-12 rounded-lg block mx-auto my-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
        onClick={toggleModal}
      >
        {/* if group dont have image first word of the name of the group will be used as image */}
        {image ? (
          <Image src={image} alt="group-image" width={20} height={20} />
        ) : (
          <span>{name[0].toUpperCase()}</span>
        )}
      </button>
    </>
  );
};

export default SidebarListItem;
