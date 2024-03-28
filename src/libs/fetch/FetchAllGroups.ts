import GroupProps from "@/props/GroupProps";
import getUserId from "../GetUserId";
import { handleApiError } from "../handleApiError";

const fetchAllGroups = async () => {
  try {
    const currentUserId = getUserId() || "";
    if (currentUserId) {
      const response = await fetch(
        `${process.env.SERVER_URL}/api/v1/group/getAllGroups/${currentUserId}`,
        {
          cache: "no-store",
          // @ts-ignore
          headers: { accessToken: process.env.SERVER_ACCESS_TOKEN },
        }
      );
      const res = await response.json();
      return res.groups as GroupProps[];
    } else {
      return [] as GroupProps[];
    }
  } catch (error) {
    console.error(error);
  }
};

export default fetchAllGroups;
