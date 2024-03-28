"use client";
import InviteUsersModal from "@/components/modals/InviteUsersModal";
import useUserId from "@/hooks/useUserId";
import GroupProps from "@/props/GroupProps";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

//Props
interface InviteButtonProps {
  groups: GroupProps[];
}

const InviteButton: React.FC<InviteButtonProps> = ({ groups }) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // Hooks
  const params = useParams();
  const userId = useUserId();

  useEffect(() => {
    if (userId && groups.length > 0) {
      const index = groups.findIndex((group) => group._id === params.groupId);
      if (index > -1 && groups[index].admin._id === userId) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [userId, groups, params]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    params.groupId &&
    isAdmin && (
      <>
        {/* Modal to invite users using email / link */}
        {isModalOpen && (
          <InviteUsersModal
            groupData={{
              adminId: typeof userId === "string" ? userId : "",
              groupId: params.groupId.toString(),
            }}
            closeModal={toggleModal}
            variant="NAVBAR"
          />
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
