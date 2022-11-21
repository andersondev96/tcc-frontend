import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { Link } from "react-router-dom";
import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { SideBar } from "../../../components/Sidebar";
import { Table } from "../../../components/Table";
import { TableBody } from "../../../components/Table/TableBody";
import { TableRowBody } from "../../../components/Table/TableBody/TableRowBody";
import { TableData } from "../../../components/Table/TableData";
import { TableHead } from "../../../components/Table/TableHead";
import { TableHeader } from "../../../components/Table/TableHead/TableHeader";
import { TableRowHead } from "../../../components/Table/TableHead/TableRowHead";

export const BudgetEntrepreneur: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-col items-center py-[1.5rem] mobile:py-[1.75rem]">
          <h1 className="font-montserrat font-medium text-2xl">Orçamentos</h1>
        </div>
        <div className="flex flex-col px-12">
          <Search />
          <div className="mt-6">
            <Table>
              <TableHead>
                <TableRowHead>
                  <TableHeader>Data</TableHeader>
                  <TableHeader>Cliente</TableHeader>
                  <TableHeader>Objetivo do serviço</TableHeader>
                  <TableHeader>Prazo</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader></TableHeader>
                </TableRowHead>
              </TableHead>
              <TableBody>
                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>João Pedro Xavier</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/07/2022</TableData>
                  <TableData>Aguardando</TableData>
                  <TableData>
                    <div className="flex flex-row gap-2">
                      <Link to="/dashboard/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                      <Link to="/dashboard/budget/create">
                        <IoDocumentTextOutline size={24} color="#1EBF1B" />
                      </Link>
                      <TbSend size={24} color="#EEB522" />
                    </div>
                  </TableData>
                </TableRowBody>

                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>João Pedro Xavier</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/07/2022</TableData>
                  <TableData>Aguardando</TableData>
                  <TableData>
                    <div className="flex flex-row gap-2">
                      <Link to="/dashboard/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                      <Link to="/dashboard/budget/create">
                        <IoDocumentTextOutline size={24} color="#1EBF1B" />
                      </Link>
                      <TbSend size={24} color="#EEB522" />
                    </div>
                  </TableData>
                </TableRowBody>

                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>João Pedro Xavier</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/07/2022</TableData>
                  <TableData>Aguardando</TableData>
                  <TableData>
                    <div className="flex flex-row gap-2">
                      <Link to="/dashboard/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                      <Link to="/dashboard/budget/create">
                        <IoDocumentTextOutline size={24} color="#1EBF1B" />
                      </Link>
                      <TbSend size={24} color="#EEB522" />
                    </div>
                  </TableData>
                </TableRowBody>

                <TableRowBody>
                  <TableData>04/07/2022</TableData>
                  <TableData>João Pedro Xavier</TableData>
                  <TableData>Cappuccino para festa</TableData>
                  <TableData>12/07/2022</TableData>
                  <TableData>Aguardando</TableData>
                  <TableData>
                    <div className="flex flex-row gap-2">
                      <Link to="/dashboard/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                      <Link to="/dashboard/budget/create">
                        <IoDocumentTextOutline size={24} color="#1EBF1B" />
                      </Link>
                      <TbSend size={24} color="#EEB522" />
                    </div>
                  </TableData>
                </TableRowBody>
              </TableBody>
            </Table>
          </div>

          <PaginationTable />
        </div>
      </div>
    </div>
  );
};
