import { createContext, ReactNode, useCallback, useContext, useState } from "react";

import api from "../services/api";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

type AuthContextProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@web:token');
        const user = localStorage.getItem('web:user');

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }: SignInCredentials) => {

        const response = await api.post('/sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@web:token', token);
        localStorage.setItem('@web:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@web:token');
        localStorage.removeItem('@web:user');

        setData({} as AuthState);
    }, []);

    const updateUser = useCallback((user: User) => {
        localStorage.setItem('@web:user', JSON.stringify(user));

        setData({
            token: data.token,
            user
        })
    }, [setData, data.token]);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthContextProvider, useAuth };