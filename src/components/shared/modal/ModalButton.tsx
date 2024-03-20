import React from "react";

interface ModalButtonProps {
  children: React.ReactNode;
  disabled: boolean;
}
const ModalButton: React.FC<ModalButtonProps> = ({ children, disabled }) => {
  return (
    <div className="text-right mt-6">
      <button
        type="submit"
        disabled={disabled}
        className="w-fit rounded-lg bg-[#162453] py-2 px-6 text-white disabled:opacity-50"
      >
        {children}
      </button>
    </div>
  );
};

export default ModalButton;
