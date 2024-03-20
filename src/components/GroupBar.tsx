"use client";
import { Squares2X2Icon, StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import SelectionMenu from "./shared/groupSelection/SelectionMenu";
import { useParams, useSearchParams } from "next/navigation";
import GroupProps from "@/props/GroupProps";

interface GroupBarProps {
  groups: GroupProps[];
}

const GroupBar: React.FC<GroupBarProps> = ({ groups }) => {
  const searchParams = useSearchParams()!;
  const params = useParams();
  const isFav = searchParams.get("favoriate");

  return (
    <div className="hidden sm:block min-w-72 max-w-72 h-svh ">
      <div className="h-16 py-2 text-center">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={20}
          className="mx-auto"
        />
      </div>

      <SelectionMenu groups={groups} />

      {params.group_slug && (
        <ul className="px-2">
          <li>
            <Link
              href={`/dashboard/${params.group_slug}`}
              className={`flex justify-start gap-2 items-center my-2 py-2.5 px-1 rounded-lg ${
                isFav ? "bg-transparent" : "bg-[rgba(0,0,0,0.1)]"
              }`}
            >
              <Squares2X2Icon className="h-6 w-6 text-black" />
              <p className="flex-1 font-semibold">Team Boards</p>
            </Link>
          </li>
          <li>
            <Link
              href={`/dashboard/${params.group_slug}?favoriate=true`}
              className={`flex justify-start gap-2 items-center my-2 py-2.5 px-1 rounded-lg ${
                isFav ? "bg-[rgba(0,0,0,0.1)]" : "bg-transparent"
              }`}
            >
              <StarIcon className="h-6 w-6 text-black" />
              <p className="flex-1 font-semibold">Favorite Boards</p>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default GroupBar;
