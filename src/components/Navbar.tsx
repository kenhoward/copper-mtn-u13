import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <Logo />
                <ul>
                    <li>
                        <Link href="/">
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link href="/matches">
                            MATCHES
                        </Link>
                    </li>
                    <li>
                        <Link href="/table">
                            TABLE
                        </Link>
                    </li>
                    <li>
                        <Link href="/stats">
                            STATS
                        </Link>
                    </li>
                </ul>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
