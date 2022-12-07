import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
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

export const AuthContextWithGoogle = createContext(
  {} as AuthContextWithGoogleType
);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;

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

    console.log(result);

    if (result.user) {
      const { uid, displayName, email, photoURL } = result.user;

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
    signOut(auth);
  }

  return (
    <AuthContextWithGoogle.Provider
      value={{ user, signInWithGoogle, signOutWithGoogle }}
    >
      {props.children}
    </AuthContextWithGoogle.Provider>
  );
}
