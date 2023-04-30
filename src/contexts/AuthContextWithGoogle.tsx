import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../services/api";
import { auth } from "../services/firebase";

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextWithGoogleType {
    user: User | undefined;
    authenticated: boolean;
    signInWithGoogle: () => Promise<void>;
    signOutWithGoogle: () => void;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContextWithGoogle = createContext({} as AuthContextWithGoogleType);

function AuthContextProviderWithGoogle(
    props: AuthContextProviderProps
): JSX.Element {
    const [googleUser, setGoogleUser] = useState<User>();
    const [googleAuthenticated, setGoogleAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user != null) {
                const { uid, displayName, email, photoURL } = user;

                if (!displayName || !email || !photoURL) {
                    throw new Error("Missing information from Google Account.");
                }

                setGoogleUser({
                    id: uid,
                    name: displayName,
                    email,
                    avatar: photoURL,
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    async function signInWithGoogle(): Promise<void> {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        if (result.user) {
            const { uid, displayName, email, photoURL } = result.user;

            if (!displayName || !email || !photoURL) {
                throw new Error("Missing information from Google Account.");
            }

            const response = await api.post("/sessions/google-auth", {
                name: displayName,
                email,
                avatar: photoURL,
            });

            const { token, user } = response.data;

            localStorage.setItem("@web:token", token);
            localStorage.setItem("@web:user", JSON.stringify(user));

            api.defaults.headers.authorization = `Bearer ${token}`;

            setGoogleAuthenticated(true);

            setGoogleUser({
                id: uid,
                name: displayName,
                email,
                avatar: photoURL,
            });
        }
    }

    const signOutWithGoogle = useCallback(() => {
        localStorage.removeItem("@web:token");
        localStorage.removeItem("@web:user");

        setGoogleAuthenticated(false);
        setGoogleUser({} as User);
    }, []);

    return (
        <AuthContextWithGoogle.Provider
            value={{
                user: googleUser,
                authenticated: googleAuthenticated,
                signInWithGoogle,
                signOutWithGoogle
            }}
        >
            {props.children}
        </AuthContextWithGoogle.Provider>
    );
}

function useAuthGoogle(): AuthContextWithGoogleType {
    const context = useContext(AuthContextWithGoogle);

    return context;
}

export { AuthContextProviderWithGoogle, useAuthGoogle };
