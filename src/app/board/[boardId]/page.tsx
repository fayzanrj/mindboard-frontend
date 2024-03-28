import Canvas from "@/components/board/Canvas";
import Room from "@/components/Room";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Board",
};

interface RoomIdPageProps {
  params: { boardId: string };
}

const RoomIdPage: React.FC<RoomIdPageProps> = ({ params }) => {
  return (
    <Room roomId={params.boardId}>
      <Canvas />
    </Room>
  );
};

export default RoomIdPage;
