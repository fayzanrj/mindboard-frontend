"use client";
import useUserId from "@/hooks/useUserId";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoaderDots from "./loaders/DotLoading";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { handleApiError } from "@/libs/handleApiError";

// Props
interface JoinGroupProps {
  groupId: string;
  userId: string;
}

const JoinGroup: React.FC<JoinGroupProps> = ({ groupId }) => {
  const userId = useUserId();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const join = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/group/joinGroup/${groupId}`,
          { user: userId },
          {
            headers: {
              accessToken: process.env.NEXT_PUBLIC_SERVER_ACCESS_TOKEN,
            },
          }
        );
        setHasJoined(true);
      } catch (error) {
        handleApiError(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      join();
    } else {
      setTimeout(() => {
        if (!userId && !hasJoined) {
          setError(true);
        }
      }, 6000);
    }
  }, [userId, groupId, hasJoined]);

  return (
    <main className="p-4 h-svh overflow-y-auto">
      <Link href={"/dashboard"} className="absolute top-4 left-4">
        <Image
          src={"/logo.png"}
          width={100}
          height={100}
          quality={100}
          alt="logo"
        />
      </Link>

      <div className="h-svh flex flex-col justify-center items-center">
        {error ? (
          <>
            <Image
              src={"/error-occured.svg"}
              width={300}
              height={300}
              alt="welcome"
            />
            <p className="text-center max-w-96 text-lg font-semibold mt-4 text-[#162453]">
              Some error occured! <br />
              Do you mind coming back at a later time
            </p>
            <p className="text-xl font-bold my-4">OR</p>

            <button
              className="font-semibold text-lg px-3"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </>
        ) : isLoading ? (
          <>
            <LoaderDots />
            <p className="text-lg font-semibold animate-pulse my-4 text-[#162453]">
              Joining group...
            </p>
          </>
        ) : (
          <>
            <Image
              src={"/welcome.svg"}
              width={300}
              height={300}
              alt="welcome"
            />
            <p className="text-lg font-semibold my-4 text-[#162453]">
              Joined group successfully!
            </p>

            <Link href={`/dashboard/${groupId}`}>
              <p className="text-[#162453] text-sm">
                Let&#39;s go to dashboard{" "}
                <span>
                  <ArrowLongRightIcon className="h-6 w-6 text-[#162453] inline-block" />
                </span>
              </p>
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default JoinGroup;
