import { ChangeEvent, useCallback, useEffect, useState } from "react";
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

    useEffect(() => {
        api.get(`companies/me`)
            .then((response) => {
                if (response.data) {
                    setCompany(response.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [company.id]);

    useEffect(() => {
        if (company.id) {
            api.get(`customers/${company.id}`)
                .then((response) => {
                    if (response.data) {
                        setClients(response.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [company.id]);

    const handleSearchClients = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;

        setName(value);

        if (company.id) {

            if (name) {
                const response = await api.get(`customers/${company.id}`, {
                    params: {
                        name: value,
                        email: value
                    }
                });

                if (response.data) {
                    setClients(response.data);
                }
            }

            if (name.length === 0) {
                const response = await api.get(`customers/${company.id}`);

                if (response.data) {
                    setClients(response.data);
                }
            }
        }

    }, [company.id, setName, setClients]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="clientes" />
            <div className="flex flex-col w-full ml-12 sm:ml-64">
                <div className="flex flex-col items-center py-7 sm:py-12">
                    <h1 className="font-medium text-2xl">Clientes</h1>
                </div>
                <div className="flex flex-col px-12">
                    <Search onChange={handleSearchClients} />
                    <div className="mt-6">
                        <Table>
                            <TableHead>
                                <TableRowHead>
                                    <TableHeader>Nome</TableHeader>
                                    <TableHeader>E-mail</TableHeader>
                                    <TableHeader>Telefone</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                </TableRowHead>
                            </TableHead>
                            <TableBody>
                                {clients.length > 0 ? clients.map((client => (
                                    <TableRowBody key={client.id}>
                                        <TableData>{client.customer.user.name}</TableData>
                                        <TableData>{client.customer.user.email}</TableData>
                                        <TableData>{client.customer.telephone}</TableData>
                                        <TableData>{client.customer.status}</TableData>
                                    </TableRowBody>

                                ))) : (
                                    <TableRowBody>
                                        <TableData>Nenhum cliente cadastrado</TableData>
                                    </TableRowBody>
                                )}
                            </TableBody>
                        </Table>
                    </div>


                </div>
            </div>
        </div>
    );
};
