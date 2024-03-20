import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex h-svh justify-center flex-col items-center">
      <Link href={"/sign-in"}>SignIn</Link>
      <Link href={"/sign-up"}>Sign up</Link>
    </div>
  );
}
