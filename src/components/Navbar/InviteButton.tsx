"use client";
import InviteUsersModal from "@/components/shared/InviteUsersModal";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const InviteButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    params.group_slug && (
      <>
        {/* Modal to invite users using email / link */}
        {isModalOpen && (
          <InviteUsersModal closeModal={toggleModal} variant="NAVBAR" />
        )}
        {/* Invite Button */}
        <button
          type="button"
          onClick={toggleModal}
          className="w-fit rounded-lg bg-[#162453] py-2 px-6 text-white disabled:opacity-50"
        >
          Invite
        </button>
      </>
    )
  );
};

export default InviteButton;
