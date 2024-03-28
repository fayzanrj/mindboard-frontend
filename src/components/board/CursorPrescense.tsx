"use client";
import { memo } from "react";
import {
  useOthersConnectionIds,
  useOthersMapped,
} from "../../../liveblocks.config";
import Cursor from "./Cursor";
import { shallow } from "@liveblocks/react";
import Path from "./Path";
import { rgbToHex } from "@/libs/RgbToHex";

// All Cursors
const Cursors = () => {
  // Getting ids of all users
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

// Other users pencil drafts
const Drafts = () => {
  // getting other user's draft
  const others = useOthersMapped(
    (others) => ({
      pencilDraft: others.presence.pencilDraft,
      penColor: others.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? rgbToHex(other.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
