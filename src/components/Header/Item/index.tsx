import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ItemProps {
  title: string;
  active?: boolean;
  redirect: string;
  children: ReactNode;
}

export const Item: React.FC<ItemProps> = ({ title, active, redirect, children}) => {
  return (
    <Link to={redirect} className=" flex flex-row h-full">
    <li className={`flex flex-row items-center gap-4 ${active ? 'bg-indigo-800' : ''} p-2 cursor-pointer hover:opacity-60 transition-opacity`}>
      {children}
      <span
        className="font-montserrat font-medium text-base text-white">
        {title}
      </span>
    </li>
  </Link>
  )
}