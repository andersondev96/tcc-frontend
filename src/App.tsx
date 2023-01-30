import { BrowserRouter, useLocation } from "react-router-dom";
import { Router } from "./routes";

import api from "./services/api";

//import { AuthContextProvider } from "./contexts/AuthContextWithGoogle";

import { AuthContextProvider } from "./contexts/AuthContext";

import ScrollToTop from "./hooks/ScrollToTop";

export const App: React.FC = () => {

    return (
        <BrowserRouter>
            <ScrollToTop>
                <AuthContextProvider>
                    <Router />
                </AuthContextProvider>
            </ScrollToTop>
        </BrowserRouter>
    );
};
