import GroupProps from "./GroupProps";

interface BoardProps {
  _id: string;
  name: string;
  group: GroupProps;
  createdBy: User;
  isFavOf: string[];
  lastUpdatedBy: User;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  firstName: string;
  lastName: string;
}

export default BoardProps;
