'use client'
import { ReactNode } from 'react';
// context
import { useGlobal } from '../context/GlobalContext';
// components
import Navbar from './Navbar';
import MobileNavbar from './MobileNavBar';

const Layout = ({ children }: { children: ReactNode }) => {
    const { isMobile } = useGlobal();

    return (
        <>
            {isMobile ? <MobileNavbar /> : <Navbar />}
            <main>{children}</main>
        </>
    );
};

export default Layout;
