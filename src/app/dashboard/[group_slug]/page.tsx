import AddNewBoardButton from "@/components/dashboard/AddNewBoardButton";
import BoardListItem from "@/components/dashboard/BoardListItem";
import BoardProps from "@/props/BoardProps";
import GroupProps from "@/props/GroupProps";
import React from "react";

const boards: BoardProps[] = [
  {
    id: "board-1",
    name: "Board 1",
    createdBy: "John Doe",
    isFavOf: [],
    lastEditedBy: "2024-03-20T06:08:15.548Z",
    image: "1.svg",
  },
  {
    id: "board-2",
    name: "Board 2",
    createdBy: "Alice Smith",
    isFavOf: [],
    lastEditedBy: "2024-03-20T05:22:55.118Z",
    image: "2.svg",
  },
  {
    id: "board-3",
    name: "Board 3",
    createdBy: "Bob Johnson",
    isFavOf: [],
    lastEditedBy: "2023-12-26T03:58:38.629Z",
    image: "3.svg",
  },
  {
    id: "board-4",
    name: "Board 4",
    createdBy: "Emma Brown",
    isFavOf: [],
    lastEditedBy: "2023-12-22T15:49:38.994Z",
    image: "4.svg",
  },
  {
    id: "board-5",
    name: "Board 5",
    createdBy: "Michael Wilson",
    isFavOf: [],
    lastEditedBy: "2023-12-15T05:24:20.437Z",
    image: "5.svg",
  },
  {
    id: "board-6",
    name: "Board 6",
    createdBy: "Sarah Miller",
    isFavOf: [],
    lastEditedBy: "2023-12-10T05:20:40.616Z",
    image: "6.svg",
  },
  {
    id: "board-7",
    name: "Board 7",
    createdBy: "David Davis",
    isFavOf: [],
    lastEditedBy: "2024-02-03T17:47:17.210Z",
    image: "7.svg",
  },
  {
    id: "board-8",
    name: "Board 8",
    createdBy: "Jennifer Jones",
    isFavOf: [],
    lastEditedBy: "2024-03-13T01:19:11.304Z",
    image: "8.svg",
  },
  {
    id: "board-9",
    name: "Board 9",
    createdBy: "Christopher Clark",
    isFavOf: [],
    lastEditedBy: "2024-02-03T16:29:38.808Z",
    image: "9.svg",
  },
  {
    id: "board-10",
    name: "Board 10",
    createdBy: "Laura Taylor",
    isFavOf: [],
    lastEditedBy: "2024-01-31T06:44:01.499Z",
    image: "10.svg",
  },
];

interface GroupBoardPageProps {
  searchParams: {
    favoriate: boolean;
  };
  params: { group_slug: string };
}

const GroupBoardPage: React.FC<GroupBoardPageProps> = ({
  searchParams,
  params,
}) => {
  return (
    <div className="p-8">
      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl font-bold">
        {searchParams.favoriate ? "Favoriate Boards" : "Team Boards"}{" "}
        <span>({params.group_slug})</span>
      </h2>

      {/* Boards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-8 pb-10">
        <AddNewBoardButton />

        {boards.map((board) => (
          <BoardListItem key={board.id} {...board} />
        ))}
      </div>
    </div>
  );
};

export default GroupBoardPage;
