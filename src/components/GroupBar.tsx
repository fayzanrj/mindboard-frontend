"use client";
import { HeartIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import GroupProps from "@/props/GroupProps";
import { IoMdClipboard } from "react-icons/io";

// Props
interface GroupBarProps {
  groups: GroupProps[];
}

const GroupBar: React.FC<GroupBarProps> = ({ groups }) => {
  const searchParams = useSearchParams()!;
  const params = useParams();
  const createdByUser = searchParams.get("createdByUser");
  const favoriates = searchParams.get("favoriates");

  return (
    <div className="hidden sm:block min-w-72 max-w-72 h-svh">
      {/* Logo */}
      <div className="h-16 py-2 text-center">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={20}
          className="mx-auto"
        />
      </div>

      {/* Side menu */}
      {params.groupId && (
        <ul className="px-2">
          <MenuItem
            icon={<Squares2X2Icon className="h-6 w-6 text-black" />}
            label="Team Boards"
            href={`/dashboard/${params.groupId}`}
            active={!createdByUser && !favoriates}
          />
          <MenuItem
            icon={<IoMdClipboard className="h-6 w-6" />}
            label="Created by me"
            href={`/dashboard/${params.groupId}?createdByUser=true`}
            active={!!createdByUser}
          />
          <MenuItem
            icon={<HeartIcon className="h-6 w-6" />}
            label="Favorites"
            href={`/dashboard/${params.groupId}?favoriates=true`}
            active={!!favoriates}
          />
        </ul>
      )}
    </div>
  );
};

interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  href: string;
  active: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, href, active }) => {
  const isActive = (active: boolean) =>
    active ? "bg-[rgba(0,0,0,0.1)]" : "bg-transparent";

  return (
    <li>
      <Link
        href={href}
        className={`flex justify-start gap-2 items-center my-2 py-2.5 px-1 rounded-lg ${isActive(
          active
        )}`}
      >
        {icon}
        <p className="flex-1 font-semibold">{label}</p>
      </Link>
    </li>
  );
};
export default GroupBar;
