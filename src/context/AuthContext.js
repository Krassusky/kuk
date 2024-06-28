import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Adjusted import
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = () => {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); // Example usage
    };

    const signOut = () => {
        auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ currentUser, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};