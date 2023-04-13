import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";

import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthContextProviderWithGoogle } from "./contexts/AuthContextWithGoogle";

import { ToastContainer } from "react-toastify";
import ScrollToTop from "./hooks/ScrollToTop";

export const App: React.FC = () => {

    return (
        <BrowserRouter>
            <ScrollToTop>
                <AuthContextProvider>
                    <AuthContextProviderWithGoogle>
                        <ToastContainer />
                        <Router />
                    </AuthContextProviderWithGoogle>
                </AuthContextProvider>
            </ScrollToTop>
        </BrowserRouter>
    );
};
