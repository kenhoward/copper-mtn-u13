'use client'
// TODO change to TypeScript file?
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
    // access to global state
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDataObj, setUserDataObj] = useState(null);
    const [loading, setLoading] = useState(true);

    // auth handlers
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // set the user to our local context state
                setLoading(true);
                setCurrentUser(user);

                if (!user) return;

                // fetch data from firestore database
                // Boilerplate info: setup in Authentication & Cloud Firestore in the console
                // (Ken: see Trello Card in Projects Board)
                console.info('Fetching User Data...');
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                let firebaseData = {}

                // method to access only if it exists
                if (docSnap.exists()) {
                    console.info('Found User Data');
                    // grabs all the data
                    firebaseData = docSnap.data();
                }
                setUserDataObj(firebaseData);
            } catch (err) {
                console.log(`Error with Auth State Changed, ${err.message}`)
            } finally {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
