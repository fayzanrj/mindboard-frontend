"use client";
import { handleApiError } from "@/libs/handleApiError";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import clipboardCopy from "clipboard-copy";
import { toast } from "sonner";
import ModalButton from "./layout/ModalButton";
import ModalLayout from "./layout/ModalLayout";

// Props
interface InviteUsersModalProps {
  closeModal: () => void;
  variant: "SIDEBAR" | "NAVBAR";
  groupData: {
    adminId: string;
    groupId: string;
  };
}

const InviteUsersModal: React.FC<InviteUsersModalProps> = ({
  groupData,
  closeModal,
  variant,
}) => {
  // States
  const [invites, setInvites] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Destructing
  const { groupId, adminId } = groupData;

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // Splitting invites string
      const emails = invites.split(/[ ,]+/);

      // API CALL
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/group/inviteUsersByEmail/${groupId}?requestingUserId=${adminId}`,
        { emails },
        {
          headers: {
            accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
          },
        }
      );
      toast.success(response.data.message);
      // CLOSING MODAL
      closeModal();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to Copy group invite ink
  const copyToLinkBoard = () => {
    try {
      clipboardCopy(
        `${process.env.NEXT_PUBLIC_HOST_URL}/groups/join/${groupData.groupId}`
      );
      toast.success("Link Copied");
    } catch (error) {
      toast.error("Failed to copy, you can open board and copy url");
    }
  };

  return (
    <ModalLayout
      closeModal={closeModal}
      heading="Invite Members"
      isLoading={isLoading}
    >
      <form className="px-4 my-6" onSubmit={handleSubmit}>
        {/* Label */}
        <label htmlFor="invites" className="text-sm font-semibold">
          Email addresses
        </label>

        {/* Note */}
        <p className="text-stone-500 text-xs my-2">
          Enter or paste one or more email addresses, separated by spaces or
          commas
        </p>

        {/* Input text area */}
        <textarea
          id="invites"
          className="resize-none py-2 px-3 border w-full rounded-lg my-1.5 h-28 placeholder:text-sm"
          placeholder="Start adding from here"
          value={invites}
          onChange={(e) => setInvites(e.currentTarget.value)}
        />

        <div className="flex">
          <label className="sr-only">Invite by link</label>
          <input
            type="text"
            name="inviteByLink"
            id="inviteByLink"
            readOnly
            value={`${process.env.NEXT_PUBLIC_HOST_URL}/groups/join/${groupData.groupId}`}
            className="flex-1 pl-2 py-1 rounded-md border border-r-0 rounded-tr-none rounded-br-none text-black outline-none"
          />
          <button
            type="button"
            className="p-1 h-full  rounded-md border border-l-0 rounded-tl-none rounded-bl-none"
            onClick={copyToLinkBoard}
          >
            <ClipboardDocumentIcon className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* Buttons */}
        <div className="text-right my-4">
          {/* Submit button */}
          <ModalButton disabled={!invites}>SEND INVITES</ModalButton>

          {/* Skip button */}
          {variant === "SIDEBAR" && (
            <button
              type="button"
              className="w-fit text-[#162453] rounded-lg py-1.5 mt-2 mx-2"
              onClick={closeModal}
            >
              SKIP
            </button>
          )}
        </div>
      </form>
    </ModalLayout>
  );
};

export default InviteUsersModal;
