"use router";
import GroupProps from "@/props/GroupProps";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarListItem: React.FC<GroupProps> = ({ id, image, name, slug }) => {
  const router = useRouter();
  return (
    <div className="group relative">
      <button
        className="w-12 h-12 rounded-lg block mx-auto my-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
        onClick={() => router.push(`/dashboard/${slug}`)}
      >
        {/* if group dont have image first word of the name of the group will be used as image */}
        {image ? (
          <Image src={image} alt="group-image" width={20} height={20} />
        ) : (
          <span>{name[0].toUpperCase()}</span>
        )}
      </button>
    </div>
  );
};

export default SidebarListItem;
