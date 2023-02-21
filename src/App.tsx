import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";


//import { AuthContextProvider } from "./contexts/AuthContextWithGoogle";

import { AuthContextProvider } from "./contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import ScrollToTop from "./hooks/ScrollToTop";

export const App: React.FC = () => {

    return (
        <BrowserRouter>
            <ScrollToTop>
                <AuthContextProvider>
                    <ToastContainer />
                    <Router />
                </AuthContextProvider>
            </ScrollToTop>
        </BrowserRouter>
    );
};
