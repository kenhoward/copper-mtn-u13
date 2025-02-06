// src/context/GlobalContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GlobalContextType {
    isSticky: boolean;
    isMobile: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // * Note to self: if the header needs a dynamic scrollY reference, plan accordingly
    const magicScrollNumber = 40;
    // TODO probably ought to offload to some config
    const magicIsMobileNumber = 600;

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > magicScrollNumber);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < magicIsMobileNumber);
        };

        // Check initially
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <GlobalContext.Provider value={{ isSticky, isMobile }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("YO! useGlobal must be used within a GlobalProvider");
    }
    return context;
};
