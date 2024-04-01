import RedirectToDashboard from "@/components/RedirectToDashboard";
import RefreshPage from "@/components/RefreshPage";
import BoardsList from "@/components/boardList/BoardsList";
import getUserId from "@/libs/GetUserId";
import fetchAllBoards from "@/libs/fetch/FetchAllBoards";
import React from "react";

// Props
interface GroupBoardPageProps {
  searchParams: {
    createdByUser: boolean;
  };
  params: { groupId: string };
}

const GroupBoardPage: React.FC<GroupBoardPageProps> = async ({
  searchParams,
  params,
}) => {
  const boards = await fetchAllBoards(params.groupId);
  const currentUserId = await getUserId();

  if (boards === undefined) {
    return <RedirectToDashboard />;
  }

  return (
    <>
      <BoardsList
        boards={boards}
        searchParams={searchParams}
        groupId={params.groupId}
        currentUserId={currentUserId}
      />
      {/* A component to refresh page everytime page opens */}
      <RefreshPage />
    </>
  );
};

export default GroupBoardPage;
