"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-svh bg-white">
      <Image
        src={"/not_found.png"}
        width={500}
        height={500}
        quality={100}
        alt="Error"
      />
      <h2 className="text-2xl mb-4 font-semibold">No Page Found</h2>
      <Link href={"/"}>
        <button className="p-0.5 px-6 text-lg border-2 rounded-full border-black">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
