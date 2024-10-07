"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.scss';

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
            {/* Top Section */}
            {!isSticky && (
                <div className={styles.topSection}>
                    <div className={styles.siteName}>Copper Mountain Soccer U13 WM</div>
                    <div className={styles.topLinks}>
                        <a href="#">Member Services</a>
                        <a href="#">Social 1</a>
                        <a href="#">Social 2</a>
                    </div>
                </div>
            )}

            {/* Navbar Section */}
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    <div className={styles.logoContainer}>
                        <Logo />
                    </div>
                    <ul className={styles.navLinks}>
                        <li>
                            <Link href="/">HOME</Link>
                        </li>
                        <li>
                            <Link href="/matches">MATCHES</Link>
                        </li>
                        <li>
                            <Link href="/table">TABLE</Link>
                        </li>
                        <li>
                            <Link href="/stats">STATS</Link>
                        </li>
                    </ul>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
