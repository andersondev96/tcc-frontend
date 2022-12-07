import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";

import api from "./services/api";

import { AuthContextProvider } from "./contexts/AuthContextWithGoogle";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
};
