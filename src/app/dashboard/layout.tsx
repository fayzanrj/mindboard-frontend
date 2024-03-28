import GroupBar from "@/components/GroupBar";
import Navbar from "@/components/Navbar/Navbar";
import ServerError from "@/components/ServerError";
import Sidebar from "@/components/Sidebar/Sidebar";
import fetchAllGroups from "@/libs/fetch/FetchAllGroups";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groups = await fetchAllGroups();

  if (groups === undefined) {
    return <ServerError />;
  }

  return (
    <div className="flex">
      <Sidebar groups={groups} />
      <GroupBar groups={groups} />
      <main className="w-full">
        <Navbar groups={groups} />
        <section>
          <div className="h-[calc(100svh_-_4rem)] sm:h-[calc(100svh_-_4rem)] overflow-y-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
