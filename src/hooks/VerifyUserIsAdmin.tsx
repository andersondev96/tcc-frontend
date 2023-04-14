import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface RequireAuthProps {
    children: ReactNode;
}

export function VerifyUserIsAdmin({ children }: any) {
    const location = useLocation();
    const { isAdmin } = useAuth();

    console.log(isAdmin);

    return isAdmin ? (
        children
    ) : (
        <Navigate to="/" replace state={{ path: location.pathname }} />
    );
}