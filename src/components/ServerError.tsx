"use client";
import Image from "next/image";
import React from "react";

const ServerError: React.FC = () => {
  return (
    <div className="w-full h-svh flex justify-center items-center flex-col">
      <Image
        src={"/error-occured.svg"}
        width={500}
        height={500}
        quality={100}
        alt="Error"
      />
      <h2 className="text-2xl mb-4 font-semibold">Some error occured</h2>
      <button
        className="p-0.5 px-6 text-lg border-2 rounded-full border-black"
        onClick={() => location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};

export default ServerError;
