import React from "react";

import { AiOutlineHome } from "react-icons/ai";
import { useAuthGoogle } from "../../contexts/AuthContextWithGoogle";
import { DropdownMenu } from "./DropdownMenu";
import { Item } from "./Item";

export const Header: React.FC = () => {
    const { user, signInWithGoogle } = useAuthGoogle();

    return (
        <nav className="flex flex-row items-center px-[3.75rem]  bg-blue-400 mobile:hidden">
            <div className="flex flex-row items-center justify-between w-full">
                <ul className="flex flex-row items-center h-[2.75rem]  gap-12">
                    <Item title="Home" redirect="/home">
                        <AiOutlineHome size={24} color="#FFFFFF" />
                    </Item>
                </ul>

                {user ? (
                    <DropdownMenu name={user?.name} avatar={user?.avatar} />
                ) : (
                    <span
                        className="font-montserrat font-medium text-sm text-white"
                        onClick={signInWithGoogle}
                    >
                        Login ou cadastre
                    </span>
                )}
            </div>
        </nav>
    );
};
