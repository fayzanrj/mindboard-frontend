import { auth } from "@clerk/nextjs";

const getUserId = () => {
  const { sessionClaims } = auth();

  //@ts-ignore
  if (sessionClaims?.user?.userId) {
    //@ts-ignore
    return sessionClaims.user.userId;
  }

  return "";
};

export default getUserId;
