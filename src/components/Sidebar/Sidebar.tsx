"use client";
import AddGroupModal from "@/components/modals/AddGroupModal";
import GroupProps from "@/props/GroupProps";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import InviteUsersModal from "../modals/InviteUsersModal";
import SidebarListItem from "./SidebarListItem";

// Group Data state props
interface GroupDataProps {
  adminId: string;
  groupId: string;
}

// Props
interface SidebarProps {
  groups: GroupProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ groups }) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupData, setGroupData] = useState<GroupDataProps>({
    adminId: "",
    groupId: "",
  });

  // Function to open and close modal
  const toggleModal = () => {
    if (!isModalOpen) {
      setGroupData({
        adminId: "",
        groupId: "",
      });
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Modal to add a new group */}
      {!groupData?.groupId && isModalOpen && (
        <AddGroupModal closeModal={toggleModal} setGroupData={setGroupData} />
      )}

      {/* Modal to invite people after group is created*/}
      {groupData?.groupId && isModalOpen && (
        <InviteUsersModal
          groupData={groupData!}
          closeModal={toggleModal}
          variant="SIDEBAR"
        />
      )}

      {/* Sidebar */}
      <aside className="min-w-[60px] w-20 h-svh bg-[#162453] text-center overflow-y-auto">
        {/* All groups list */}
        {groups.map((item) => (
          <SidebarListItem key={item._id} {...item} />
        ))}
        {/* Button to add a group */}
        <button className="my-2" onClick={toggleModal}>
          <PlusIcon className="h-8 w-8 text-white" />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
