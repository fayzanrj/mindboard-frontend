"use client";
import GroupProps from "@/props/GroupProps";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Loader from "../Loader";
import ModalLayout from "./modal/ModalLayout";
import ModalInputField from "./modal/ModalInputField";
import ModalButton from "./modal/ModalButton";

// Props
interface AddGroupModalProps {
  closeModal: () => void;
  setGroup: React.Dispatch<React.SetStateAction<GroupProps | null>>;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({
  setGroup,
  closeModal,
}) => {
  // Ref
  const groupImageRef = useRef<HTMLInputElement>(null);
  // States
  const [groupName, setGroupName] = useState("");
  const [groupSlug, setGroupSlug] = useState("");
  const [groupPic, setGroupPic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Slug generation
  const handleAutoGenerateSlug = () => {
    const slug = groupName.replaceAll(" ", "-");
    setGroupSlug(slug);
  };

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
  const handleSubmit = (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      setTimeout(
        () =>
          setGroup({
            id: "11",
            name: "name",
            image: "aa",
            slug: "-1-1",
          }),
        3000
      );
    } catch (error) {
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
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
          {/* File input field */}
          <input
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
                <button
                  type="button"
                  // @ts-ignore
                  onClick={() => setGroupPic("")}
                >
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

        <ModalInputField
          label="Group slug"
          placeHolder="Enter group slug"
          id="slug"
          value={groupSlug}
          setValue={setGroupSlug}
          handleAutoGenerate={handleAutoGenerateSlug}
        />

        {/* Submit button */}
        <ModalButton disabled={!groupName || !groupSlug || isLoading}>
          CREATE GROUP
        </ModalButton>
      </form>
    </ModalLayout>
  );
};

export default AddGroupModal;
