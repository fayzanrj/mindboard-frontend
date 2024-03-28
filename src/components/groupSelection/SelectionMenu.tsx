"use client";
import GroupProps from "@/props/GroupProps";
import { useEffect, useState } from "react";

import SelectionMenuItem from "./SelectionListItem";
import { useParams, useRouter } from "next/navigation";
import SelectionListItem from "./SelectionListItem";
import { group } from "console";

const nullGroup: GroupProps = {
  _id: "",
  name: "Select a group",
  image: "",
  admin: {
    _id: "",
    username: "",
    email: "",
    profilePic: "",
  },
  members: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Props
interface SelectionMenuProps {
  groups: GroupProps[];
}

const SelectionMenu: React.FC<SelectionMenuProps> = ({ groups }) => {
  // States
  const [selected, setSelected] = useState<GroupProps>(nullGroup);
  const [isListOpen, setIsListOpen] = useState(false);
  // Hooks
  const router = useRouter();
  const params = useParams();

  // Function to execute when the user clicks on a certain group in the list
  // It pushes user to the clicked group and closes list
  const handleGroupItemClick = (group: GroupProps) => {
    setIsListOpen(!isListOpen);
    setSelected(group);
    router.push(`/dashboard/${group._id}`);
  };

  // Function to open menu only if there's any group in the list
  const openMenu = () => {
    if (groups.length > 0) {
      setIsListOpen(!isListOpen);
    }
  };

  useEffect(() => {
    // Finding the selected group using params if the user directly opens the group from url instead of selecting  from dashboard
    const index = groups.findIndex((item) => item._id === params.groupId);
    if (index > -1) {
      setSelected(groups[index]);
    } else {
      if (groups[0]) {
        setSelected(groups[0]);
        router.push(`dashboard/${groups[0]._id}`);
      }
    }
  }, [params, groups, router]);

  return (
    <div className="text-center w-full max-w-96 px-1 select-none relative">
      {/* Selected group */}
      <SelectionMenuItem
        handleClick={openMenu}
        {...selected}
        variant="SELECTED"
      />

      {/* Options menu */}
      {isListOpen && (
        <div className="absolute top-[110%] max-h-96 overflow-y-auto left-1 md:left-10 shadow-2xl drop-shadow-2xl w-96 max-w-[65vw] rounded-2xl p-1 bg-[#faf5ff] border border-gray-200 z-30">
          {groups.map((item) => (
            <SelectionListItem
              key={item._id}
              variant="OPTION"
              selectedGroupId={selected._id}
              {...item}
              handleClick={() => handleGroupItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionMenu;
