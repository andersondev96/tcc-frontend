import { useState } from "react";
import { ItemDropdown } from "./ItemDropdown";

interface DropdownMenuProps {
  name: string;
  imageAvatar: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = (
  {
    name,
    imageAvatar,
  }
) => {

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <ul
    className="flex flex-col items-center"
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
  >
    <li id="dropdownNavLink" data-dropdown-toggle="dropdownNavbar" className="flex flex-col">
      <button

        className={`flex flex-row items-center gap-6 cursor-pointer hover:opacity-60 transition-opacity`}
      >
        <img
          src={imageAvatar}
          alt={name}
          className="h-9 w-9 object-fill rounded-full"
        />
        <span
          className="font-montserrat font-medium text-base text-white">
          {name}
        </span>
      </button>
    </li>
    <div id="dropdownNavBar" className={`${!showDropdown ? 'hidden' : ''} absolute z-10 bg-white rounded shadow w-44 top-[3.125rem]`}>
      <ul className="py-1 text-sm text-gray-700"
      >
        <ItemDropdown  title="Favoritos" redirect="/favorites" />
        <ItemDropdown  title="Orçamento" redirect="/budget" />
        <ItemDropdown  title="Editar perfil" redirect="/profile" />
        <ItemDropdown  title="Login" redirect="/login" /> 
      </ul>
    </div>
  </ul>
  );
}