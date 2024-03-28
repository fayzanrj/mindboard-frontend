import JoinGroup from "@/components/JoinGroup";
import getUserId from "@/libs/GetUserId";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Join group",
};

interface JoinPageProps {
  params: { groupId: string };
}

const JoinPage: React.FC<JoinPageProps> = async ({ params }) => {
  const userId = await getUserId();

  return <JoinGroup groupId={params.groupId} userId={userId} />;
};

export default JoinPage;
