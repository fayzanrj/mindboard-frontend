import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex min-h-svh h-fit justify-center items-center py-8">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
