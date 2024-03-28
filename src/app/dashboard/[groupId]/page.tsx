import RedirectToDashboard from "@/components/RedirectToDashboard";
import RefreshPage from "@/components/RefreshPage";
import AddNewBoardButton from "@/components/boardList/AddNewBoardButton";
import BoardListItem from "@/components/boardList/BoardListItem";
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
  const currentUserId = await getUserId();

  const boards = await fetchAllBoards(params.groupId);

  if (boards === undefined) {
    return <RedirectToDashboard />;
  }

  return (
    <>
      <div className="p-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-bold">
          {searchParams.createdByUser ? "Created by You" : "Team Boards"}
        </h2>

        {/* Boards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-8 pb-10">
          <AddNewBoardButton />

          {boards.map((board) => {
            if (searchParams.createdByUser) {
              if (board.createdBy._id === currentUserId) {
                return <BoardListItem key={board._id} {...board} />;
              }
            } else {
              return <BoardListItem key={board._id} {...board} />;
            }
          })}
        </div>
      </div>

      {/* A component to refresh page everytime page opens */}
      <RefreshPage />
    </>
  );
};

export default GroupBoardPage;
