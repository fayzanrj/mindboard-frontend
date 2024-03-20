import GroupBar from "@/components/GroupBar";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import SelectionMenu from "@/components/shared/groupSelection/SelectionMenu";
import GroupProps from "@/props/GroupProps";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  searchParams: {
    favoriate: boolean;
  };
}) {
  const sidebaritems: GroupProps[] = [
    {
      id: "97",
      name: "Group 1 ok asla aksaok akakkaspsak",
      image: "",
      slug: "1-1-1",
    },
    {
      id: "12",
      name: "Group 2 okay ji how are you so wassup ji, hi ji ow ji    ",
      image: "",
      slug: "1-1-2",
    },
    {
      id: "123",
      name: "Group 3",
      image: "",
      slug: "1-1-3",
    },
    {
      id: "15433",
      name: "Group 4",
      image: "",
      slug: "1-1-4",
    },
    {
      id: "1123",
      name: "Group 5",
      image: "",
      slug: "1-1-8",
    },
    {
      id: "13",
      name: "Group 6",
      image: "",
      slug: "1-1-9",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <GroupBar groups={sidebaritems} />
      <main className="w-full">
        <Navbar /> {/* Menu to select groups */}
        <div className="sm:hidden w-56 h-16 ">
          <SelectionMenu groups={sidebaritems} />
        </div>
        <section>
          <div className="h-[calc(100svh_-_8rem)] sm:h-[calc(100svh_-_4rem)] overflow-y-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
