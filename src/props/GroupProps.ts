interface GroupProps {
  _id: string;
  name: string;
  image: string;
  admin: GroupUsers;
  members: GroupUsers[] | string[];
  createdAt: Date;
  updatedAt: Date;
}

interface GroupUsers {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
}

export default GroupProps;
