import RedirectToDashboard from "@/components/RedirectToDashboard";
import getUserId from "@/libs/GetUserId";
import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignInPage = () => {
  const user = getUserId();

  if (user) {
    return <RedirectToDashboard />;
  }
  return (
    <div className="flex h-svh overflow-y-auto justify-center items-center py-16">
      <SignIn redirectUrl={"/dashboard"} />
    </div>
  );
};

export default SignInPage;
