import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex min-h-svh h-fit justify-center items-center py-4">
      <SignIn />
    </div>
  );
};

export default SignInPage;
