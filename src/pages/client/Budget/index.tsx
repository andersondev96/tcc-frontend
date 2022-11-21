import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineSearch,
} from "react-icons/ai";
import { Header } from "../../../components/Header";
import { Table } from "../../../components/Table";
import { TableHead } from "../../../components/Table/TableHead";
import { TableRowHead } from "../../../components/Table/TableHead/TableRowHead";
import { TableHeader } from "../../../components/Table/TableHead/TableHeader";
import { TableBody } from "../../../components/Table/TableBody";
import { TableRowBody } from "../../../components/Table/TableBody/TableRowBody";
import { TableData } from "../../../components/Table/TableData";
import { PaginationTable } from "../../../components/PaginationTable";
import { Link, useNavigate } from "react-router-dom";
import { PreviousPageButton } from "../components/PreviousPageButton";
import { Search } from "../../../components/Search";

export const Budget: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col p-12">
        <PreviousPageButton />
        <div className="flex flex-col">
          <div className="flex flex-col items-center py-[3.375rem] mobile:py-[1.75rem] mobile:items-start">
            <h1 className="font-montserrat font-medium text-2xl">
              Meus orçamentos
            </h1>
          </div>
          <div className="flex flex-col">
            <Search />

            <div className="mt-6">
              <Table>
                <TableHead>
                  <TableRowHead>
                    <TableHeader>Data</TableHeader>
                    <TableHeader>Empresa</TableHeader>
                    <TableHeader>Objetivo do serviço</TableHeader>
                    <TableHeader>Prazo</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader></TableHeader>
                  </TableRowHead>
                </TableHead>
                <TableBody>
                  <TableRowBody>
                    <TableData>04/07/2022</TableData>
                    <TableData>Sightglass coffee</TableData>
                    <TableData>Cappuccino para festa</TableData>
                    <TableData>12/04/2022</TableData>
                    <TableData>Finalizada</TableData>
                    <TableData>
                      <Link to="/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                    </TableData>
                  </TableRowBody>
                  <TableRowBody>
                    <TableData>04/07/2022</TableData>
                    <TableData>Sightglass coffee</TableData>
                    <TableData>Cappuccino para festa</TableData>
                    <TableData>12/04/2022</TableData>
                    <TableData>Finalizada</TableData>
                    <TableData>
                      <Link to="/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                    </TableData>
                  </TableRowBody>
                  <TableRowBody>
                    <TableData>04/07/2022</TableData>
                    <TableData>Sightglass coffee</TableData>
                    <TableData>Cappuccino para festa</TableData>
                    <TableData>12/04/2022</TableData>
                    <TableData>Finalizada</TableData>
                    <TableData>
                      <Link to="/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                    </TableData>
                  </TableRowBody>
                  <TableRowBody>
                    <TableData>04/07/2022</TableData>
                    <TableData>Sightglass coffee</TableData>
                    <TableData>Cappuccino para festa</TableData>
                    <TableData>12/04/2022</TableData>
                    <TableData>Finalizada</TableData>
                    <TableData>
                      <Link to="/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                    </TableData>
                  </TableRowBody>
                  <TableRowBody>
                    <TableData>04/07/2022</TableData>
                    <TableData>Sightglass coffee</TableData>
                    <TableData>Cappuccino para festa</TableData>
                    <TableData>12/04/2022</TableData>
                    <TableData>Finalizada</TableData>
                    <TableData>
                      <Link to="/budget/details">
                        <AiOutlineEye size={24} color="#547DE5" />
                      </Link>
                    </TableData>
                  </TableRowBody>
                </TableBody>
              </Table>
            </div>
            <PaginationTable />
          </div>
        </div>
      </div>
    </div>
  );
};
