"use client";
import React, { useState } from "react";
import ModalLayout from "./modal/ModalLayout";
import ModalButton from "./modal/ModalButton";

// Props
interface InviteUsersModalProps {
  closeModal: () => void;
  variant: "SIDEBAR" | "NAVBAR";
}

const InviteUsersModal: React.FC<InviteUsersModalProps> = ({
  closeModal,
  variant,
}) => {
  // State
  const [invites, setInvites] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
    } catch (error) {
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
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

        {/* Input area */}
        <textarea
          id="invites"
          className="resize-none py-2 px-3 border w-full rounded-lg my-1.5 h-28 placeholder:text-sm"
          placeholder="Start adding from here"
          value={invites}
          onChange={(e) => setInvites(e.currentTarget.value)}
        />

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
