import { Link } from "react-router-dom";

interface ItemDropdownProps {
  title: string;
  redirect: string;
}

export const ItemDropdown: React.FC<ItemDropdownProps> = ({ title, redirect }) => {
  return (
    <Link to={redirect}>
      <li 
        className="cursor-pointer hover:bg-blue-200 hover:bg-opacity-40 transition-colors"
      >
        <span className="block px-4 py-2">{title}</span>
      </li>
    </Link>
  )
}