import Link from 'next/link';
// context
import { useGlobal } from '../context/GlobalContext';
// components
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
// styles
import styles from './MobileNavBar.module.scss';

const MobileNavbar = () => {
    const { isSticky } = useGlobal();

    return (
        <nav>
            <div className={`${styles.linksContainer} ${isSticky ? styles.sticky : ''}`}>
                <Logo mobile />
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

export default MobileNavbar;
