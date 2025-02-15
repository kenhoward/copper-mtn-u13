import Link from 'next/link';
// context
import { useGlobal } from '../context/GlobalContext';
// components
import Logo from './Logo';
// styles
import styles from './MobileNavBar.module.scss';

const MobileNavbar = () => {
    const { isSticky } = useGlobal();

    return (
        <nav>
            <div className={`${styles.linksContainer} ${isSticky ? styles.sticky : ''}`}>
                <Logo mobile />
                {/* // TODO make this DRY */}
                {/* // TODO fix the spacing in new component as well */}
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
            </div>
        </nav>
    );
};

export default MobileNavbar;
