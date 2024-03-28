import React from "react";
import { SignUp } from "@clerk/nextjs";
import getUserId from "@/libs/GetUserId";
import RedirectToDashboard from "@/components/RedirectToDashboard";

const SignUpPage = () => {
  const user = getUserId();

  if (user) {
    return <RedirectToDashboard />;
  }

  return (
    <div className="flex h-svh overflow-y-auto justify-center items-center py-16">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
