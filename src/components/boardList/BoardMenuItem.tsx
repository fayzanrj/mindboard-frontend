"use client";

// Menu item Props
interface BoardMenuItemProps {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  action: () => void;
}

// Menu item component
const BoardMenuItem: React.FC<BoardMenuItemProps> = ({
  label,
  Icon,
  action,
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLLIElement> | React.TouchEvent<HTMLLIElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <li
      className="py-1.5 px-2 hover:bg-[rgba(0,0,0,0.1)]"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <Icon className="h-3.5 w-3.5 text-black inline-block align-middle" />
      <span className="pl-1">{label}</span>
    </li>
  );
};

export default BoardMenuItem;
