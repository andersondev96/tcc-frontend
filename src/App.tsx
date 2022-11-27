import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

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
