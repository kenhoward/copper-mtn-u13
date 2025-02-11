// src/components/Navbar.tsx
"use client";
import Link from 'next/link';
// context
import { useGlobal } from '../context/GlobalContext';
// components
import Logo from './Logo';
// import ThemeToggle from './ThemeToggle';
// styles
import styles from './Navbar.module.scss';

const Navbar = () => {
    const { isSticky } = useGlobal();

    return (
        <div className={styles.navBarContainer}>
            {!isSticky && (
                <div className={styles.topSectionContainer}>
                    <div className={styles.linksContainer}>
                        <Link href="/admin">Admin</Link>
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
                            {/* <ThemeToggle /> */}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
