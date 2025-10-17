// src/components/Navbar.tsx
"use client";
import Link from 'next/link';
// context
import { useAuth } from '@/context/AuthContext';
import { useGlobal } from '../context/GlobalContext';
// components
import Logo from './Logo';
// import ThemeToggle from './ThemeToggle';
// styles
import styles from './Navbar.module.scss';

const Navbar = () => {
    const { isSticky } = useGlobal();
    const { currentUser, logout } = useAuth();

    return (
        <div className={styles.navBarContainer}>
            {!isSticky && (
                <div className={styles.topSectionContainer}>
                    <div className={styles.linksContainer}>
                        {currentUser && <Link href="/admin">Admin</Link>}
                        {currentUser ? (
                            <span
                                className={styles.linkLike}
                                onClick={logout}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") logout();
                                }}
                            >
                                <span className={styles.logout}>Log out</span>
                            </span>
                        ) : (
                            <Link href="/admin">Log in</Link>
                        )}
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
                            {/* // TODO make this DRY */}
                            {/* // TODO fix the spacing in new component as well */}
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
                            {/* // TODO evaluate if I still want this functionality */}
                            {/* <ThemeToggle /> */}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
