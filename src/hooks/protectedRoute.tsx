import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = ({ ...props }) => {
    const token = localStorage.getItem("token");

    const isAuthenticated: boolean = token !== null && token !== undefined;

    return isAuthenticated ? <Outlet {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
