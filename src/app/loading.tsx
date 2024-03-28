import Loader from "@/components/loaders/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Loading;
