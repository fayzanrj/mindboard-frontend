import Loader from "@/components/Loader";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

// Props
interface ModalLayoutProps {
  children: React.ReactNode;
  heading: "Create Group" | "Invite Members" | "New board";
  closeModal: () => void;
  isLoading: boolean;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  closeModal,
  heading,
  isLoading,
}) => {
  return (
    <div className="w-full h-svh flex justify-center items-center absolute top-0 left-0  bg-[rgba(0,0,0,0.6)] z-20">
      <div className="w-[98%] sm:w-[28rem] transition-all duration-[5000]  bg-white shadow-lg p-4 rounded-3xl relative">
        {isLoading ? (
          <div className="w-full min-h-[98vw] sm:min-h-96 flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : (
          <>
            {/* Close button */}
            <div className="text-right">
              <button type="button" className="w-fit" onClick={closeModal}>
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Heading */}
            <h3 className="text-4xl font-semibold tracking-tighter px-4">
              {heading}
            </h3>

            {/* Rest of the components */}
            {children}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalLayout;
