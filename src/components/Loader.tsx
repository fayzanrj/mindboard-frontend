import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Image
        src={"/loading.png"}
        alt="logo"
        width={200}
        height={200}
        className="animate-pulse duration-100"
      />
    </div>
  );
};

export default Loader;
