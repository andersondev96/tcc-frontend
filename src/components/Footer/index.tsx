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

    return (
        <div className="flex items-end justify-center bg-gray-700 p-1.5">
            <span className="text-sm text-white">
                &#169; 2022 Start Business
            </span>
        </div>
    )
}