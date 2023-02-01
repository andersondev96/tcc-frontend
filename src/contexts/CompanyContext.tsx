import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface Company {
    id: string;
    name: string;
    user_id: string;
}

interface CompanyContextData {
    company: Company | undefined;
}

type CompanyContextProviderProps = {
    children: ReactNode;
}

const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData);

export function CompanyProvider({ children }: CompanyContextProviderProps) {
    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        api.get('/companies/me')
            .then(response => setCompany(response.data))
    }, []);

    return (
        <CompanyContext.Provider value={{ company }}>
            {children}
        </CompanyContext.Provider>
    )
}

export function useCompany() {
    const context = useContext(CompanyContext);

    return context;
}

