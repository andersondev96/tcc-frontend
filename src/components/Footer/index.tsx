import { useEffect, useState } from "react";
import api from "../../services/api";

export const Footer: React.FC = () => {
    const [company, setCompany] = useState([]);
    const [entrepreneur, setEntrepreneur] = useState();

    useEffect(() => {
        async function loadCompany() {
            api
                .get('/companies/me')
                .then(response => {
                    setCompany(response.data);
                })
                .catch(error => console.log("Ocorreu um erro ao realizar a requisição", error))
        }

        loadCompany();
    }, [setCompany]);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="flex items-center justify-center bg-gray-700 p-1">
            <span className={classNames(company && "ml-64", "text-white")}>
                &#169; 2022 Start Business
            </span>
            <a href="" className="text-right">
                Acessar área do cliente
            </a>
        </div>
    )
}