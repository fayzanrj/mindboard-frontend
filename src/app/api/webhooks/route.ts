import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import axios from "axios";
import { clerkClient, redirectToSignIn } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name,
        lastName: last_name,
        profilePic: image_url,
      };

      try {
        const response = await axios.post(
          `${process.env.SERVER_URL}/api/v1/user/signupwithclerk`,
          { user },
          {
            headers: {
              accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
            },
          }
        );

        if (response) {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: response.data.userId,
            },
          });
        }
      } catch (error) {
        await clerkClient.users.deleteUser(id);
        redirectToSignIn();
      }
    } else if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;

      const { userId } = evt.data.public_metadata;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name,
        lastName: last_name,
        profilePic: image_url,
      };

      const response = await axios.put(
        `${process.env.SERVER_URL}/api/v1/user/updateUser/${userId}`,
        { user },
        {
          headers: {
            accessToken: process.env.SERVER_ACCESS_TOKEN,
          },
        }
      );
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("", { status: 500 });
  }
}
