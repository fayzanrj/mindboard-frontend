"use client";
import { Squares2X2Icon, StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import SelectionMenu from "./groupSelection/SelectionMenu";
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

  return (
    <div className="hidden sm:block min-w-72 max-w-72 h-svh ">
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
          <li>
            <Link
              href={`/dashboard/${params.groupId}`}
              className={`flex justify-start gap-2 items-center my-2 py-2.5 px-1 rounded-lg ${
                createdByUser ? "bg-transparent" : "bg-[rgba(0,0,0,0.1)]"
              }`}
            >
              <Squares2X2Icon className="h-6 w-6 text-black" />
              <p className="flex-1 font-semibold">Team Boards</p>
            </Link>
          </li>
          <li>
            <Link
              href={`/dashboard/${params.groupId}?createdByUser=true`}
              className={`flex justify-start gap-2 items-center my-2 py-2.5 px-1 rounded-lg ${
                createdByUser ? "bg-[rgba(0,0,0,0.1)]" : "bg-transparent"
              }`}
            >
              <IoMdClipboard className="h-6 w-6" />
              <p className="flex-1 font-semibold">Created by me</p>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default GroupBar;
