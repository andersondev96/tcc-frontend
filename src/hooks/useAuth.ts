import { useContext } from "react";
import { AuthContextWithGoogle } from "../contexts/AuthContextWithGoogle";

export function useAuth() {
    const value = useContext(AuthContextWithGoogle);

    return value;
}