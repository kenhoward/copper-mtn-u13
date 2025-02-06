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
    // TODO probably ought to offload to some config
    const magicIsMobileNumber = 600;

    useEffect(() => {
        const handleScroll = () => {
            // TODO make more dynamic off the header height
            const scrollThreshold = isMobile ? 70 : 40;
            setIsSticky(window.scrollY > scrollThreshold);
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
