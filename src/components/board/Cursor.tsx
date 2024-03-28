"use client";
import React, { memo } from "react";
import { useOther } from "../../../liveblocks.config";
import { BsFillCursorFill } from "react-icons/bs";
import { connectionIdToColor } from "@/libs/GetBorderColor";

// Props
interface CursorProps {
  connectionId: number;
}

// Cursor component
const Cursor: React.FC<CursorProps> = memo(({ connectionId }) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  // @ts-ignore
  const name = info.username || "member";

  if (!cursor) {
    return null;
  }

  // Coordinates of the user's cursor
  const { x, y } = cursor;

  return (
    <foreignObject
      xmlns="http://www.w3.org/1999/xhtml"
      style={{
        width: `${name.length * 10 + 24}px`,
        height: "50px",
        transform: `translate(${x}px, ${y}px)`,
        transformOrigin: "0% 0%",
      }}
      className="relative drop-shadow-md"
    >
      <BsFillCursorFill
        size={"1.4rem"}
        style={{
          fill: connectionIdToColor(connectionId),
          transform: "rotateY(180deg)",
          position: "fixed",
        }}
      />
      <div
        className="absolute top-5 left-4 text-xs w-fit"
        style={{ color: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

export default Cursor;

Cursor.displayName = "Cursor";
