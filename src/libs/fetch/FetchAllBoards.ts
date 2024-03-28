import BoardProps from "@/props/BoardProps";
import getUserId from "../GetUserId";

const fetchAllBoards = async (groupId: string) => {
  try {
    const currentUserId = getUserId() || "";
    const response = await fetch(
      `${process.env.SERVER_URL}/api/v1/board/getAllBoards/${groupId}?requestingUserId=${currentUserId}`,
      {
        cache: "no-store",
        // @ts-ignore
        headers: { accessToken: process.env.SERVER_ACCESS_TOKEN },
      }
    );

    const res = await response.json();
    return res.boards as BoardProps[];
  } catch (error) {
    console.error(error);
  }
};

export default fetchAllBoards;
