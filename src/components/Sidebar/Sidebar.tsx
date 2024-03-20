"use client";
import AddGroupModal from "@/components/shared/AddGroupModal";
import GroupProps from "@/props/GroupProps";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import InviteUsersModal from "../shared/InviteUsersModal";
import SidebarListItem from "./SidebarListItem";

const sidebaritems: GroupProps[] = [
  {
    id: "97",
    name: "Group 1 ok asla aksaok akakkaspsak",
    image: "",
    slug: "1-1-1",
  },
  {
    id: "12",
    name: "Group 2 okay ji how are you so wassup ji, hi ji ow ji    ",
    image: "",
    slug: "1-1-2",
  },
  {
    id: "123",
    name: "Group 3",
    image: "",
    slug: "1-1-3",
  },
  {
    id: "15433",
    name: "Group 4",
    image: "",
    slug: "1-1-4",
  },
  {
    id: "1123",
    name: "Group 5",
    image: "",
    slug: "1-1-8",
  },
  {
    id: "13",
    name: "Group 6",
    image: "",
    slug: "1-1-9",
  },
];

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [group, setGroup] = useState<GroupProps | null>(null);

  // Function to open and close modal
  const toggleModal = () => {
    if (!isModalOpen) {
      setGroup(null);
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Add Group Moadal */}
      {!group?.id && isModalOpen && (
        <AddGroupModal closeModal={toggleModal} setGroup={setGroup} />
      )}

      {/* Modal to invite people after group is created*/}
      {group?.id && isModalOpen && (
        <InviteUsersModal closeModal={toggleModal} variant="SIDEBAR" />
      )}

      {/* Sidebar */}
      <aside className="min-w-[60px] w-20 h-svh bg-[#162453] text-center">
        {/* All groups list */}
        {sidebaritems.map((item) => (
          <SidebarListItem key={item.id} {...item} />
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
