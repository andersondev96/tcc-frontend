import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface RequireAuthProps {
    children: ReactNode;
}

export function RequireAuth({ children }: any) {
    const { authenticated } = useAuth();
    const location = useLocation();

    return authenticated ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}