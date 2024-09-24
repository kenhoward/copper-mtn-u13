"use client"
import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.scss';

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

    const lightSwitch = darkMode ? 'NIGHT' : 'DAY';

    return (
        <div className={styles.toggleWrapper}>
            {/* I may want to rethink this lightswitch - looks awkward */}
            <span>{lightSwitch} MODE</span>
            <input
                type="checkbox"
                className={styles.dn} 
                id="dn"
                checked={darkMode}
                onChange={toggleTheme}
            />
            <label htmlFor="dn" className={styles.toggle}>
                <span className={styles.toggle__handler}>
                    <span className={`${styles.crater} ${styles['crater--1']}`}></span>
                    <span className={`${styles.crater} ${styles['crater--2']}`}></span>
                    <span className={`${styles.crater} ${styles['crater--3']}`}></span>
                </span>
                <span className={`${styles.star} ${styles['star--1']}`}></span>
                <span className={`${styles.star} ${styles['star--2']}`}></span>
                <span className={`${styles.star} ${styles['star--3']}`}></span>
                <span className={`${styles.star} ${styles['star--4']}`}></span>
                <span className={`${styles.star} ${styles['star--5']}`}></span>
                <span className={`${styles.star} ${styles['star--6']}`}></span>
            </label>
        </div>
    );
};

export default ThemeToggle;
