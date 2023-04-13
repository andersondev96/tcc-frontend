import { useState } from "react";
import { ItemDropdown } from "./ItemDropdown";

import { useNavigate } from "react-router-dom";
import { useAuthGoogle } from "../../../contexts/AuthContextWithGoogle";

interface DropdownMenuProps {
    name: string;
    avatar: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ name, avatar }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    const { user, signInWithGoogle, signOutWithGoogle } = useAuthGoogle();

    function handleSignOutWithGoogle() {
        signOutWithGoogle();

        navigate("/login");
    }

    return (
        <ul
            className="flex flex-col items-center relative z-50"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            <li
                id="dropdownNavLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex flex-col"
            >
                <button
                    className={`flex flex-row items-center gap-6 cursor-pointer hover:opacity-60 transition-opacity`}
                >
                    <img
                        src={avatar}
                        alt={name}
                        className="h-8 w-8 object-fill rounded-full"
                    />
                    <span className="font-montserrat font-medium text-sm text-white">
                        {name}
                    </span>
                </button>
            </li>
            <div
                id="dropdownNavBar"
                className={`${!showDropdown ? "hidden" : ""
                    } absolute z-10 bg-white rounded shadow w-44 top-[2.45rem]`}
            >
                <ul className="py-1 text-sm text-gray-700">
                    <ItemDropdown title="Favoritos" redirect="/favorites" />
                    <ItemDropdown title="Orçamento" redirect="/budget" />
                    <ItemDropdown title="Editar perfil" redirect="/profile" />
                    <ItemDropdown
                        title="Sair"
                        redirect=""
                        onClick={handleSignOutWithGoogle}
                    />
                </ul>
            </div>
        </ul>
    );
};
