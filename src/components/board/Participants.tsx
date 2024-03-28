"use client";
import React, { useState } from "react";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { connectionIdToColor } from "@/libs/GetBorderColor";
import Image from "next/image";
import ModalLayout from "../modals/layout/ModalLayout";

const Participants = () => {
  // Getting other users
  const users = useOthers();
  // Getting logged in user
  const currentUser = useSelf();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      {isModalOpen && (
        <ModalLayout
          heading="Partcipants"
          closeModal={toggleModal}
          isLoading={false}
        >
          <div className="my-6">
            <p className="text-lg">
              <div
                className="w-3 h-3 rounded-full inline-block mr-2"
                style={{
                  backgroundColor: connectionIdToColor(
                    currentUser.connectionId
                  ),
                }}
              />
              {currentUser.info?.username}
            </p>
            {users.map((user) => (
              <p key={user?.info?._id} className="text-lg">
                <div
                  className="w-3 h-3 rounded-full inline-block mr-2"
                  style={{
                    backgroundColor: connectionIdToColor(user.connectionId),
                  }}
                />
                {user?.info?.username}
              </p>
            ))}
          </div>
        </ModalLayout>
      )}
      <div className="min-w-20 px-2 h-11 bg-white shadow-lg rounded-md drop-shadow inline-flex justify-center items-center gap-2 ">
        <ParticipantAvatar
          borderColor={connectionIdToColor(currentUser.connectionId)}
          profilePic={currentUser?.info?.profilePic!}
        />

        {/* Other users */}
        {users?.length <= 2 ? (
          users
            .slice(0, 2)
            .map((user) => (
              <ParticipantAvatar
                key={user.connectionId}
                borderColor={connectionIdToColor(user.connectionId)}
                profilePic={user?.info?.profilePic!}
              />
            ))
        ) : (
          <>
            {users.slice(0, 1).map((user) => (
              <ParticipantAvatar
                key={user.connectionId}
                borderColor={connectionIdToColor(user.connectionId)}
                profilePic={user?.info?.profilePic!}
              />
            ))}
            <button
              className="peer h-9 w-9 rounded-full border-2 overflow-hidden relative bg-neutral-700 text-white"
              onClick={toggleModal}
            >
              {users.length - 1}+
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Participants;

// Partcipant avatar props
interface ParticipantAvatarProps {
  borderColor: string;
  profilePic: string;
}

const ParticipantAvatar: React.FC<ParticipantAvatarProps> = ({
  borderColor,
  profilePic,
}) => (
  <button
    className="h-9 w-9 rounded-full border-2 overflow-hidden relative"
    style={{ borderColor }}
  >
    <Image
      src={profilePic}
      alt="profile pic"
      width={500}
      height={200}
      className="object-fill rounded-full"
    />
  </button>
);
