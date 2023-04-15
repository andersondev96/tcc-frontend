import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../services/api";
import { auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
};

type AuthContextWithGoogleType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signOutWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

const AuthContextWithGoogle = createContext(
    {} as AuthContextWithGoogleType
);

function AuthContextProviderWithGoogle(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, displayName, email, photoURL, } = user;

                if (!displayName || !email || !photoURL) {
                    throw new Error("Missing information from Google Account.");
                }

                setUser({
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

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        if (result.user) {
            const { uid, displayName, email, photoURL } = result.user;
            const token = await result.user.getIdToken();

            localStorage.setItem('@web:token', token);
            localStorage.setItem('@web:user', JSON.stringify(result));

            const response = await api.get("users/email", {
                params: {
                    email: email
                }
            });

            if (!response.data) {

                const data = {
                    name: displayName,
                    email: email,
                    password: uuidv4(),
                    isEntrepreneur: false,
                }

                await api.post("/users", data);
            }

            if (!displayName || !email || !photoURL) {
                throw new Error("Missing information from Google Account.");
            }

            setUser({
                id: uid,
                name: displayName,
                email,
                avatar: photoURL,
            });
        }
    }

    async function signOutWithGoogle() {
        try {
            await auth.signOut();
        } catch (err) {
            console.log(err);
        }

        console.log(auth);
    }

    return (
        <AuthContextWithGoogle.Provider
            value={{ user, signInWithGoogle, signOutWithGoogle }}
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

