import { UserButton } from "@clerk/nextjs";
import InviteButton from "./InviteButton";

const Navbar = () => {
  return (
    <nav className="flex h-16 items-center">
      {/* Search input field */}
      <div className="flex-1 px-1 sm:px-4">
        <label className="sr-only">Search</label>
        <input
          className="w-11/12 max-w-[30rem] h-10 border border-stone-300 rounded-lg px-4 bg-transparent outline-none"
          placeholder="Search"
        />
      </div>

      {/* Action buttons */}
      <div className="w-fit flex gap-2 sm:gap-5 px-2 items-center">
        <InviteButton />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
