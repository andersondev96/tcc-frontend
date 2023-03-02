import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../../../components/NavBar/NavBar";
import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { Table } from "../../../components/Table";
import { TableBody } from "../../../components/Table/TableBody";
import { TableRowBody } from "../../../components/Table/TableBody/TableRowBody";
import { TableData } from "../../../components/Table/TableData";
import { TableHead } from "../../../components/Table/TableHead";
import { TableHeader } from "../../../components/Table/TableHead/TableHeader";
import { TableRowHead } from "../../../components/Table/TableHead/TableRowHead";

export const Budget: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="orcamentos" />
            <div className="flex flex-col p-8">
                <div className="flex flex-col">
                    <div className="flex flex-col items-start sm:items-center py-4">
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
