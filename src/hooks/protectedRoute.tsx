import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ props }: any) => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
