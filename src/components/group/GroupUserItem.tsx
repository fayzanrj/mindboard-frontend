import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// Props
interface GroupUserItemProps {
  user: {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
  };
  adminId: string;
  currentUserId: string;
  variant: "MEMBER" | "ADMIN";
  removeMember: (userToRemove: string) => void;
}

const GroupUserItem: React.FC<GroupUserItemProps> = ({
  user,
  variant,
  adminId,
  currentUserId,
  removeMember,
}) => {
  const { _id, email, profilePic, username } = user;

  return (
    <div className="w-full my-4 px-2 flex gap-4">
      <div>
        <Image
          src={profilePic}
          alt="profile pic"
          width={400}
          height={40}
          className="w-11 h-11 rounded-full"
        />
      </div>

      <div className="text-nowrap text-ellipsis overflow-hidden flex-1">
        <p className="text-ellipsis text-nowrap overflow-hidden">{username}</p>
        <p className="text-sm text-gray-500 text-ellipsis text-nowrap overflow-hidden">
          {email}
        </p>
      </div>

      {variant === "MEMBER" && currentUserId === adminId && (
        <button className="text-xs" onClick={() => removeMember(_id)}>
          <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-black" />
        </button>
      )}
    </div>
  );
};

export default GroupUserItem;
