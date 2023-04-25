import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthContextProviderWithGoogle } from "./contexts/AuthContextWithGoogle";
import ScrollToTop from "./hooks/ScrollToTop";
import { Router } from "./routes";

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
