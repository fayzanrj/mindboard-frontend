import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <Image
      src={"/loading.png"}
      alt="loading"
      width={200}
      height={200}
      className="animate-pulse duration-100"
    />
  );
};

export default Loader;
