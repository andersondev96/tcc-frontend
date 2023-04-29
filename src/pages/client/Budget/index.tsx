import { format } from "date-fns";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
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
import api from "../../../services/api";
import { PreviousPageButton } from "../components/PreviousPageButton";

interface Proposal {
    id: string;
    company_id: string;
    objective: string;
    time: string;
    description: string;
    status: string;
    createdAt: string;
    company: {
        id: string;
        name: string;
    }
}

interface Customer {
    id: string;
}

export const Budget: React.FC = () => {
    const [customer, setCustomer] = useState<Customer>({} as Customer);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [valueSearch, setValueSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalResults, setTotalResults] = useState(0);

    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage);
    }, []);

    useEffect(() => {
        api.get(`/customers/my-customer`).then(response => setCustomer(response.data));
    }, []);

    useEffect(() => {
        api.get(`/proposals?page=${currentPage}&perPage=${itemsPerPage}`)
            .then(response => {
                setProposals(response.data.proposals);
                setTotalResults(response.data.totalResults);
            });
    }, [currentPage, itemsPerPage]);

    const handleSearch = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValueSearch(value);

        if (valueSearch) {
            await api.get(`/proposals?page=${currentPage}&perPage=${itemsPerPage}`, {
                params: {
                    objective: value,
                    description: value,
                    status: value,
                    company: value
                }
            }).then((response) => {
                setProposals(response.data.proposals);
                setTotalResults(response.data.totalResults);
            }).catch((err) => {
                console.log("Ocorreu um erro ao realizar a requisição", err);
            });
        }
    }, [valueSearch, setProposals, currentPage, itemsPerPage]);

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex flex-col p-10">
                <PreviousPageButton />

                <div className="flex flex-col">
                    <div className="flex flex-col items-start sm:items-center py-4">
                        <h1 className="font-montserrat font-medium text-2xl">
                            Meus orçamentos
                        </h1>
                    </div>
                    <div className="flex flex-col">
                        <Search onChange={handleSearch} />

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
                                    {proposals ? (
                                        proposals.map(proposal => (
                                            <TableRowBody key={proposal.id}>
                                                <TableData>{format(new Date(proposal.createdAt), "dd/MM/yyyy")}</TableData>
                                                <TableData>{proposal.company.name}</TableData>
                                                <TableData>{proposal.objective}</TableData>
                                                <TableData>{format(new Date(proposal.time), "dd/MM/yyyy")}</TableData>
                                                <TableData>{proposal.status}</TableData>
                                                <TableData>
                                                    <Link to={`/budget/details/${proposal.id}`}>
                                                        <AiOutlineEye size={24} color="#547DE5" />
                                                    </Link>
                                                </TableData>
                                            </TableRowBody>
                                        ))
                                    ) : (
                                        <p>Nenhuma proposta encontrada</p>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <PaginationTable
                            tot_results={totalResults}
                            items_per_page={itemsPerPage}
                            current_page={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
