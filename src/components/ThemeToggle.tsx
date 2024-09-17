"use client"
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };
    const lightSwitch = darkMode ? 'NIGHT' : 'DAY'

    return (
        <div className="toggleWrapper">
            {/* I may want to rethink this lightswitch - looks awkward */}
            <span>{lightSwitch} MODE</span>
            <input type="checkbox" className="dn" id="dn" checked={darkMode} onChange={toggleTheme} />
            <label htmlFor="dn" className="toggle">
                <span className="toggle__handler">
                    <span className="crater crater--1"></span>
                    <span className="crater crater--2"></span>
                    <span className="crater crater--3"></span>
                </span>
                <span className="star star--1"></span>
                <span className="star star--2"></span>
                <span className="star star--3"></span>
                <span className="star star--4"></span>
                <span className="star star--5"></span>
                <span className="star star--6"></span>
            </label>
        </div>
    );
};

export default ThemeToggle;
