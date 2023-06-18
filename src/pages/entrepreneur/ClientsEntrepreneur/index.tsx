import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import api from "../../../services/api";
import formatTelephone from "../../../utils/formatTelephone";

interface Company {
    id: string;
}
interface Customer {
    id: string;
    company_id: string;
    customer_id: string;
    customer: {
        id: string;
        user_id: string;
        telephone: string;
        status: string;
        user: {
            id: string;
            name: string;
            email: string;
        }
    }
}

export const ClientsEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<Company>({} as Company);
    const [clients, setClients] = useState<Customer[]>([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`companies/me`)
            .then((response) => {
                if (response.data) {
                    setCompany(response.data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, [company.id, setIsLoading]);

    useEffect(() => {
        if (company.id) {
            api.get(`customers/${company.id}?page=${currentPage}&perPage=${itemsPerPage}`)
                .then((response) => {
                    if (response.data) {
                        setClients(response.data.customers);
                        setTotalResults(response.data.totalResults);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                })
        }
    }, [company.id, currentPage, itemsPerPage, setIsLoading]);

    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage);
    }, [currentPage, setCurrentPage]);

    const handleSearchClients = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {

        try {
            const value = event.target.value;

            setName(value);

            setIsLoading(false);


            if (company.id) {

                if (name) {
                    const response = await api.get(`customers/${company.id}?page=${currentPage}&perPage=${itemsPerPage}`, {
                        params: {
                            name: name,
                            email: name
                        }
                    });

                    if (response.data) {
                        setClients(response.data.customers);
                        setTotalResults(response.data.totalResults);
                    }
                }

                if (name.length === 0) {
                    const response = await api.get(`customers/${company.id}?page=${currentPage}&perPage=${itemsPerPage}`);

                    if (response.data) {
                        setClients(response.data.customers);
                        setTotalResults(response.data.totalResults);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }

    }, [company.id, setName, setClients, clients, totalResults, currentPage, itemsPerPage, setIsLoading]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="clientes" />
            <div className="flex flex-col w-full ml-12 sm:ml-64">
                <div className="flex flex-col items-center py-7 sm:py-12">
                    <h1 className="font-medium text-2xl">Clientes</h1>
                </div>
                <div className="flex flex-col px-12">
                    <Search onChange={handleSearchClients} />
                    <>
                        {isLoading ? (
                            <div className="flex flex-col items-center mt-24">
                                <h1 className="font-medium text-2xl">Carregando...</h1>
                            </div>
                        ) : (
                            <div>
                                <div className="mt-6">
                                    <Table>
                                        <TableHead>
                                            <TableRowHead>
                                                <TableHeader>Nome</TableHeader>
                                                <TableHeader>E-mail</TableHeader>
                                                <TableHeader>Telefone</TableHeader>
                                            </TableRowHead>
                                        </TableHead>
                                        <TableBody>
                                            {clients.length > 0 ? clients.map((client => (

                                                <TableRowBody key={client.id}>
                                                    <TableData>{client.customer.user.name}</TableData>
                                                    <TableData>{client.customer.user.email}</TableData>
                                                    <TableData>{formatTelephone(client.customer.telephone)}</TableData>
                                                </TableRowBody>



                                            ))) : (
                                                <TableRowBody>
                                                    <TableData>Nenhum cliente cadastrado</TableData>
                                                </TableRowBody>
                                            )}
                                        </TableBody>
                                    </Table>
                                    <PaginationTable
                                        tot_results={totalResults}
                                        items_per_page={itemsPerPage}
                                        current_page={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>

                            </div>
                        )}
                    </>



                </div>
            </div>
        </div>
    );
};
