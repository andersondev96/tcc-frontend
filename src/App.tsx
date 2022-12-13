import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";

import api from "./services/api";

//import { AuthContextProvider } from "./contexts/AuthContextWithGoogle";

import { AuthContextProvider } from "./contexts/AuthContext";

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Router />
            </AuthContextProvider>
        </BrowserRouter>
    );
};
