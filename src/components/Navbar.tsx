// src/components/Navbar.tsx
"use client";
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useGlobal } from '../context/GlobalContext';
import styles from './Navbar.module.scss';

const Navbar = () => {
    const { isSticky } = useGlobal();

    return (
        <div className={styles.navBarContainer}>
            {!isSticky && (
                <div className={styles.topSectionContainer}>
                    <div className={styles.linksContainer}>
                        <a href="#">Member Services</a>
                        <a href="#">Social 1</a>
                        <a href="#">Social 2</a>
                    </div>
                </div>
            )}
            <div className={`${styles.lowerSectionContainer} ${isSticky ? styles.sticky : ''}`}>
                <div className={styles.headerContainer}>
                    <nav className={styles.navbarSection}>
                        <div className={styles.navLinksContainer}>
                            <div className={styles.logo}>
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
                </div>
            </div>
        </div>
    );
};

export default Navbar;
