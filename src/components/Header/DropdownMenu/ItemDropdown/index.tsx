import { Link } from "react-router-dom";

interface ItemDropdownProps {
  title: string;
  redirect: string;
  onClick?: () => void;
}

export const ItemDropdown: React.FC<ItemDropdownProps> = ({
  title,
  redirect,
  onClick,
}) => {
  return (
    <Link to={redirect} onClick={onClick}>
      <li className="cursor-pointer hover:bg-blue-200 hover:bg-opacity-40 transition-colors">
        <span className="block px-4 py-2">{title}</span>
      </li>
    </Link>
  );
};
