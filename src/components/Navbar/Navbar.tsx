import GroupProps from "@/props/GroupProps";
import { UserButton } from "@clerk/nextjs";
import InviteButton from "./InviteButton";
import SelectionMenu from "../groupSelection/SelectionMenu";

interface NavbarProps {
  groups: GroupProps[];
}

const Navbar: React.FC<NavbarProps> = async ({ groups }) => {
  return (
    <nav className="flex h-16 items-center justify-between">
      <SelectionMenu groups={groups} />
      {/* Action buttons */}
      <div className="w-fit flex gap-2 sm:gap-5 px-2 items-center">
        {groups && <InviteButton groups={groups} />}
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
