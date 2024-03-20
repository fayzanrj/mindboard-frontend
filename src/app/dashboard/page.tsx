import Image from "next/image";
import React from "react";

interface DashboardProps {
  searchParams: {
    favoriate: boolean;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ searchParams }) => {
  return (
    <div className="w-full h-[100%] flex flex-col justify-center items-center">
      <Image src={"/no-selected.svg"} alt="image" width={400} height={400} />
      <h3 className="text-lg sm:text-2xl font-semibold text-[#162453]">
        Select a group to start working
      </h3>
    </div>
  );
};

export default Dashboard;
