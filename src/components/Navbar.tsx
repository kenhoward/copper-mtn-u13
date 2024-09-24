import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

// styles
import styles from './Navbar.module.scss';

const Navbar = () => {
    return (
        <nav>
            <div className={styles.navContainer}>
                <Logo />
                <ul>
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
    );
};

export default Navbar;
