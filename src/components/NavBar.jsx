import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import styles from '../styles/css/App.module.css';

export function NavBar() {
    const [showSideBar, setShowSideBar] = useState(false);

    return (
        <>
            <div className={[styles.navbar, (showSideBar ? styles.show : '')].join(' ')}>
                <Link className={styles.navLink} to={"/"}>Home</Link>
                <Link className={styles.navLink} to={"/about"}>About</Link>
                <Link className={styles.navLink} to={"/settings"}>Settings</Link>
                {!showSideBar && <ThemeSwitcher size={18} />}
            </div>

            {/* This will only appear on mobile */}
            <div className={styles.mobileNav}>
                <button
                    className={styles.menuBtn}
                    onClick={() => {setShowSideBar(!showSideBar)}}
                >
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </button>
                <ThemeSwitcher size={18} />
            </div>
        </>
    );
}