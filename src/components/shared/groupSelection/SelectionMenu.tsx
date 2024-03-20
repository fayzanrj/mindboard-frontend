"use client";
import GroupProps from "@/props/GroupProps";
import { useEffect, useState } from "react";

import SelectionMenuItem from "./SelectionMenuItem";
import { useParams, useRouter } from "next/navigation";

const nullGroup: GroupProps = {
  id: "",
  name: "(No group selected)",
  image: "",
  slug: "",
};

interface SelectionMenuProps {
  groups: GroupProps[];
}

const SelectionMenu: React.FC<SelectionMenuProps> = ({ groups }) => {
  const params = useParams();
  const [selected, setSelected] = useState<GroupProps>(nullGroup);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleGroupItemClick = (item: GroupProps) => {
    setIsMenuOpen(!isMenuOpen);
    setSelected(item);
    router.push(`/dashboard/${item.slug}`);
  };

  useEffect(() => {
    const index = groups.findIndex((item) => item.slug === params.group_slug);
    console.log({ index });
    if (index > -1) {
      setSelected(groups[index]);
    }
  }, [params]);

  return (
    <div className="text-center w-full px-1 select-none relative">
      {/* Selected group */}
      <SelectionMenuItem
        handleClick={() => setIsMenuOpen(!isMenuOpen)}
        {...selected}
        variant="SELECTED"
      />

      {/* Options menu */}
      {isMenuOpen && (
        <div className="absolute top-[110%] max-h-96 overflow-y-auto left-1 md:left-10 shadow-2xl drop-shadow-2xl w-96 max-w-[65vw] rounded-2xl p-1 bg-[#faf5ff] border border-gray-200">
          {groups.map((item) => (
            <SelectionMenuItem
              key={item.id}
              variant="OPTION"
              selectedSlug={selected.slug}
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
