"use client";
import useUserId from "@/hooks/useUserId";
import { handleApiError } from "@/libs/handleApiError";
import GroupProps from "@/props/GroupProps";
import {
  ArrowRightStartOnRectangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ModalLayout from "./layout/ModalLayout";
import GroupUserItem from "../group/GroupUserItem";

// Props
interface GroupInfoModalProps {
  groupId: string;
  closeModal: () => void;
}

const GroupInfoModal: React.FC<GroupInfoModalProps> = ({
  groupId,
  closeModal,
}) => {
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<GroupProps>();
  // Hooks
  const router = useRouter();
  const currentUserId = useUserId();
  const path = usePathname();

  useEffect(() => {
    // Function fetch group
    const fetchGroup = async () => {
      try {
        setIsLoading(true);

        // API CALL
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/group/getGroup/${groupId}?requestingUserId=${currentUserId}`,
          {
            headers: {
              accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
            },
          }
        );
        setGroup(response.data.group);
      } catch (error) {
        handleApiError(error);
        setTimeout(() => router.refresh(), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetching group data
    fetchGroup();
  }, [currentUserId, groupId, router]);

  // Function to remove member
  const removeMember = async (userToRemoveId: string) => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/group/removeMember/${groupId}?requestingUserId=${currentUserId}`,
        { user: userToRemoveId },
        {
          headers: {
            accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
          },
        }
      );

      toast.success(response.data.message);
      // Removing user from current group data
      // @ts-ignore
      setGroup((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          members: prev.members.filter(
            (member) =>
              typeof member !== "string" && member._id !== userToRemoveId
          ),
        };
      });
    } catch (error) {
      handleApiError(error);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  const leaveGroup = async () => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/group/leaveGroup/${groupId}?requestingUserId=${currentUserId}`,
        {},
        {
          headers: {
            accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
          },
        }
      );

      toast.success(response.data.message);

      // Closing group info modaa
      closeModal();
      // If current group that user left is opened then redirecting user to dashboard
      path === `/dashboard/${groupId}`
        ? router.push("/dashboard")
        : router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Funciton to delete group
  const deleteGroup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/group/deleteGroup/${groupId}?requestingUserId=${currentUserId}`,
        {
          headers: {
            accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
          },
        }
      );

      closeModal();

      // If current group that user left is opened then redirecting user to dashboard
      path === `/dashboard/${groupId}`
        ? router.push("/dashboard")
        : router.refresh();

      toast.success(response.data.message);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // If group is not found / error occured
  if (group === undefined) {
    return (
      <ModalLayout closeModal={closeModal} heading={""} isLoading={isLoading}>
        <Image
          src={"/error-occured.svg"}
          width={300}
          height={300}
          alt="welcome"
          className="mx-auto"
        />
        <h3 className="mb-6 text-xl font-semibold">No group found buddy!</h3>
      </ModalLayout>
    );
  }

  // Destructuring group
  const { admin, image, members, name } = group;

  return (
    <ModalLayout
      closeModal={closeModal}
      heading={name || ""}
      isLoading={isLoading}
    >
      {group && (
        <>
          <button
            disabled
            className="w-20 h-20 rounded-full block mx-auto my-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
          >
            {image ? (
              <Image src={image} alt="group-image" width={20} height={20} />
            ) : (
              <span className="text-3xl">{name[0].toUpperCase()}</span>
            )}
          </button>

          {/* Admin */}
          <div className="text-left">
            <h3 className="text-xl font-semibold ">Admin</h3>
            <GroupUserItem
              currentUserId={currentUserId}
              adminId={admin._id}
              variant="ADMIN"
              user={admin}
              removeMember={removeMember}
            />
          </div>

          {/* Members */}
          <div className="text-left">
            <h3 className="text-xl font-semibold ">Members</h3>
            {members?.length > 0 ? (
              members.map(
                (member) =>
                  typeof member !== "string" && (
                    <GroupUserItem
                      currentUserId={currentUserId}
                      key={member._id}
                      adminId={group.admin._id}
                      user={member}
                      variant="MEMBER"
                      removeMember={removeMember}
                    />
                  )
              )
            ) : (
              <div className="w-full text-center my-4">
                <p>No members found</p>
              </div>
            )}
          </div>

          <div className="text-right px-2 my-6  ">
            {/* Delete button if user is the admin */}
            {currentUserId === admin._id ? (
              <button
                className="py-1 px-4 rounded-md text-white bg-red-600"
                onClick={deleteGroup}
              >
                DELETE{" "}
                <span className="h-full align-middle pb-1.5">
                  <TrashIcon className="h-5 w-5 text-white inline-block align-middle" />
                </span>
              </button>
            ) : (
              // Leave group button if current user is the member
              <button
                className="py-1 px-4 rounded-md text-white bg-red-600 "
                onClick={leaveGroup}
              >
                LEAVE{" "}
                <span>
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5 mb-0.5 text-white inline-block" />
                </span>
              </button>
            )}
          </div>
        </>
      )}
    </ModalLayout>
  );
};

export default GroupInfoModal;
