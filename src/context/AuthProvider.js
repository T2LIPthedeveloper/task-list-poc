import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, [auth]);

    const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
    const loginWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const signUpWithEmailPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, loginWithEmailPassword, signUpWithEmailPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
