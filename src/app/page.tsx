import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  {
    label: "Log in",
    href: "/sign-in",
  },
  {
    label: "Sign Up",
    href: "/sign-up",
  },
  {
    label: "Github",
    href: "https://github.com/fayzanrj/mindboard-frontend",
  },
];

export default async function Home() {
  return (
    <main className="flex h-svh justify-center flex-col items-center bg-white LANDING_PAGE">
      <ul className="p-2 float-right">
        {NAV_LINKS.map((nav) => (
          <li
            key={nav.href}
            className="inline mx-2 text-lg md:mx-5 md:text-2xl font-semibold text-neutral-100"
          >
            <Link href={nav.href}>{nav.label}</Link>
          </li>
        ))}
      </ul>
      <Image
        src={"/logo-white.png"}
        alt="logo"
        width={400}
        height={100}
        className="w-64 md:w-80"
      />
    </main>
  );
}
