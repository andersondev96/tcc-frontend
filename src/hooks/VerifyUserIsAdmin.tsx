import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../services/api";

interface RequireAuthProps {
    children: ReactNode;
}

export function VerifyUserIsAdmin({ children }: any) {
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        async function handleIsAdmin() {
            try {
                const response = await api.get("/users/entrepreneur");

                if (response.data) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (err) {
                console.log('Erro ao realizar a requisição: ', err);
            }
        }

        handleIsAdmin()

    }, [setIsAdmin, isAdmin]);

    useEffect(() => {
        console.log(isAdmin);
    }, [isAdmin]);

    return isAdmin ? (
        children
    ) : (
        <Navigate to="/" replace state={{ path: location.pathname }} />
    );
}