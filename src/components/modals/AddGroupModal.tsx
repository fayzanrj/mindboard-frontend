"use client";
import useUserId from "@/hooks/useUserId";
import { handleApiError } from "@/libs/handleApiError";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import ModalButton from "./layout/ModalButton";
import ModalInputField from "./layout/ModalInputField";
import ModalLayout from "./layout/ModalLayout";
import { useAuth } from "@clerk/nextjs";

// Props
interface AddGroupModalProps {
  closeModal: () => void;
  setGroupData: React.Dispatch<
    React.SetStateAction<{
      adminId: string;
      groupId: string;
    }>
  >;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  setGroupData,
  closeModal,
}) => {
  // Ref
  const groupImageRef = useRef<HTMLInputElement>(null);
  // States
  const [groupName, setGroupName] = useState("");
  const [groupPic, setGroupPic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Hooks
  const currentUserId = useUserId();
  const router = useRouter();
  const auth = useAuth();

  // Handling image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]; // Only consider the first file
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      if (imagePreview) {
        setGroupPic(imagePreview);
      }
    }
    if (groupImageRef && groupImageRef.current) {
      groupImageRef.current.value = "";
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      if (currentUserId) {
        const group = {
          admin: currentUserId,
          name: groupName,
          Image: "",
        };

        // API CALL
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/group/createGroup`,
          { group },
          {
            headers: {
              accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
            },
          }
        );

        toast.success(response.data.message);
        // Setting group to open invite users modal
        setGroupData({
          adminId: currentUserId,
          groupId: response.data.groupId,
        });
        // Refreshing page to fetch latest data
        router.refresh();
      } else {
        toast.error("Some error occured");
        location.reload();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout
      closeModal={closeModal}
      heading="Create Group"
      isLoading={isLoading}
    >
      <form className="px-4 my-6" onSubmit={handleSubmit}>
        {/* Upload pic */}
        <div className="h-16 py-3 flex gap-4">
          <label className="sr-only" htmlFor="imageInput">
            Upload Image
          </label>
          {/* File input field */}
          <input
            id="imageInput"
            type="file"
            className="sr-only select-none"
            ref={groupImageRef}
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />

          {groupPic ? (
            // Group image if selected
            <Image
              src={groupPic}
              alt="alt"
              width={800}
              height={200}
              quality={100}
              className="h-11 w-11 border aspect-square rounded-lg"
            />
          ) : (
            // Select image if no image selected
            <button
              className="text-center h-11 w-11 rounded-lg bg-stone-500"
              type="button"
              // @ts-ignore
              onClick={() => groupImageRef?.current?.click()}
            >
              <ArrowUpTrayIcon className="h-6 w-6 text-white mx-auto" />
            </button>
          )}

          {/* Upload pic heading and actions */}
          <div className="flex-1">
            {/* Heading */}
            <h3 className="text-sm font-semibold">Profile Image</h3>

            {/* Action  */}
            <div className="text-blue-600">
              {groupPic ? (
                // Delete selected image
                <button type="button" onClick={() => setGroupPic("")}>
                  <TrashIcon className="h-5 w-5 text-black mx-auto mr-2" />
                </button>
              ) : (
                // Upload image text
                <button
                  className="text-xs"
                  type="button"
                  // @ts-ignore
                  onClick={() => groupImageRef?.current?.click()}
                >
                  Upload Image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Inputs Fields */}
        <ModalInputField
          label="Group name"
          placeHolder="Enter group name here"
          id="groupname"
          value={groupName}
          setValue={setGroupName}
        />

        {/* Submit button */}
        <ModalButton disabled={!groupName || isLoading}>
          CREATE GROUP
        </ModalButton>
      </form>
    </ModalLayout>
  );
};

export default AddGroupModal;
