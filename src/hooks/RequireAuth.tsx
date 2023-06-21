import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAuthGoogle } from "../contexts/AuthContextWithGoogle";

interface RequireAuthProps {
    children: ReactNode;
}

export function RequireAuth({ children }: any) {
    const { user } = useAuth();
    const { user: userGoogle } = useAuthGoogle();
    const location = useLocation();

    return (user || userGoogle) ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}