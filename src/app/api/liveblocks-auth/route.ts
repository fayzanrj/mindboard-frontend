import getUserId from "@/libs/GetUserId";
import { Liveblocks } from "@liveblocks/node";
import axios from "axios";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET!,
});

export async function POST(req: Request) {
  try {
    // Get the current user from your database
    const currentUserId = await getUserId();

    const { room } = await req.json();

    // getting board
    const response = await axios.get(
      `${process.env.SERVER_URL}/api/v1/board/getBoardWithUser/${room}?requestingUserId=${currentUserId}`,
      {
        headers: { accessToken: process.env.SERVER_ACCESS_TOKEN },
      }
    );

    const user = response.data.user;
    //   Start an auth session inside your endpoint
    const session = liveblocks.prepareSession(
      (user.id = user._id),
      {
        userInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePic: user.profilePic,
        },
      } // Optional
    );

    // Giving access
    if (room) {
      session.allow(room, session.FULL_ACCESS);
    }

    // Authorizing the user and return the result
    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    return new Response("Unauthorized", { status: 403 });
  }
}
