import { ReactNode } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";

interface ItemLinkProps {
  link: string;
  title: string;
  children: ReactNode;
}

export const ItemLink: React.FC<ItemLinkProps> = ({
  link,
  title,
  children

}) => {
  return (
    <Link to={link}>
      <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center py-3 px-8 ">
        <div className="flex items-center font-montserrat font-semibold text-base">
          {children}
          <span className="ml-2">{title}</span>
        </div>
      </li>
    </Link>
  );
}