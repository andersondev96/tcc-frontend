import { useContext } from "react";
import { AuthContextWithGoogle } from "../contexts/AuthContextWithGoogle";

export function useAuthWithGoogle() {
    const value = useContext(AuthContextWithGoogle);

    return value;
}