import React, { ReactNode } from 'react';
import {
    Navigate,
    Outlet
} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface isPrivateProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: isPrivateProps) => {
    const { user } = useAuth();

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;