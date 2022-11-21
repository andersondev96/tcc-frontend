import React, { useState } from "react";
import { AiOutlineClose, AiOutlineDashboard } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { FiEdit2, FiSettings } from "react-icons/fi";
import { MdOutlineDesignServices, MdOutlinePeopleAlt } from "react-icons/md";
import { BsCalculator } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { ItemLink } from "./ItemLink";
export const SideBar: React.FC = () => {
  const [showSideBarMobile, setShowSideBarMobile] = useState(false);

  return (
    <div className="flex flex-no-wrap">
      <div
        className="p-2 absolute z-10 hidden mobile:block"
        onClick={() => setShowSideBarMobile(!showSideBarMobile)}
      >
        <GiHamburgerMenu
          className={`text-xl  ${
            !showSideBarMobile ? "text-black" : "text-white"
          }`}
        />
      </div>
      <div
        className={`w-64 h-full fixed z-10 top-0 left-0 overflow-x-auto bg-indigo-600 shadow  flex-col sm:flex ${
          showSideBarMobile ? "flex" : "hidden"
        }`}
      >
        <div className="flex items-center mt-8 mb-2 px-8">
          <div className="w-10 h-10 bg-cover rounded-md mr-3">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_5.png"
              className="rounded-full h-full w-full overflow-hidden shadow"
            />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Steve Doe</p>
            <p className="text-gray-600 text-xs">Singhtglass Coffee</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-white">
          <FiEdit2 />
          <p>Editar perfil</p>
        </div>

        <div className="flex flex-col h-full justify-between mt-8 border-t border-gray-200">
          <ul className="mt-8 ">
            <ItemLink link="/dashboard" title="Dashboard">
              <AiOutlineDashboard size={24} />
            </ItemLink>

            <ItemLink link="/dashboard/business" title="Empresa">
              <BiStore size={24} />
            </ItemLink>

            <ItemLink link="/dashboard/services" title="Serviços">
              <MdOutlineDesignServices size={24} />
            </ItemLink>

            <ItemLink link="/dashboard/clients" title="Clientes">
              <MdOutlinePeopleAlt size={24} />
            </ItemLink>

            <ItemLink link="/dashboard/budget" title="Orçamentos">
              <BsCalculator size={24} />
            </ItemLink>

            <ItemLink link="/dashboard/chat" title="Chat">
              <IoChatbubblesOutline size={24} />
            </ItemLink>

            <ItemLink link="/dashboard/settings" title="Configurações">
              <FiSettings size={24} />
            </ItemLink>
          </ul>

          <div className="mt-[4.65rem] px-8 bg-indigo-800">
            <ul className="w-full flex items-center font-montserrat font-semibold text-base">
              <li className="flex flex-row items-center justify-center gap-12 cursor-pointer text-white pt-5 pb-3">
                <AiOutlineClose size={24} />
                Sair
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
