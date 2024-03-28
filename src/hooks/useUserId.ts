import { useUser } from "@clerk/nextjs";

const useUserId = () => {
  const { user } = useUser();

  return (user?.publicMetadata.userId as string) || "";
};

export default useUserId;
