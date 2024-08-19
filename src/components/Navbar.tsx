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
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/matches">
                            Matches
                        </Link>
                    </li>
                    <li>
                        <Link href="/table">
                            Table
                        </Link>
                    </li>
                    <li>
                        <Link href="/stats">
                            Stats
                        </Link>
                    </li>
                </ul>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
