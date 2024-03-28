"use client";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import Loader from "./loaders/Loader";

const RedirectToDashboard = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="absolute top-0 left-0 bg-[#faf5ff] w-full h-svh flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default RedirectToDashboard;
