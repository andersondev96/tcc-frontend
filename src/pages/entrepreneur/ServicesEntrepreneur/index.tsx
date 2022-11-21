import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModalContainer } from "../../../components/ModalContainer";
import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { SideBar } from "../../../components/Sidebar";
import { DeleteModal } from "../components/DeleteModal";
import { ServiceCard } from "../components/ServiceCard";

export const ServicesEntrepreneur: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-col items-center py-[1.5rem] mobile:py-[1.75rem]">
          <h1 className="font-montserrat font-medium text-2xl mobile:text-lg">
            Serviços oferecidos
          </h1>
        </div>
        <div className="px-20 py-6 mobile:py-2">
          <div className="flex flex-row items-center justify-between mobile:flex-col mobile:items-start mobile:gap-4">
            <Link to="/dashboard/create">
              <button className="w-36 h-10 bg-indigo-400 rounded font-montserrat font-semibold text-sm text-white hover:brightness-90 transition-opacity duration-300">
                Adicionar serviço
              </button>
            </Link>
            <Search />
          </div>
          <div className="grid grid-cols-4 gap-12 mt-12 mobile:grid-cols-1">
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </div>
          <PaginationTable />
        </div>
      </div>
    </div>
  );
};

export default ServicesEntrepreneur;
