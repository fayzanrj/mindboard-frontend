"use client";
import React from "react";
import { RoomProvider } from "../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import BoardLoader from "./board/BoardLoader";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/props/CanvasProps";

// Props
interface RoomProps {
  children: React.ReactNode;
  roomId: string;
}

const Room: React.FC<RoomProps> = ({ children, roomId }) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={<BoardLoader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
