import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import styles from '../styles/css/App.module.css';

export default function MobileNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event) => {
            if (event.target.classList.contains(styles.navLink) ||
                event.target.classList.contains(styles.overlay)) {
                closeMenu();
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <>
            {/* Mobile Header */}
            <header className={styles.mobileNavHeader}>
                <button
                    className={[styles.hamburgerButton, isMenuOpen ? styles.active : ''].join(' ')}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className={styles.hamburgerLine}></div>
                    <div className={styles.hamburgerLine}></div>
                    <div className={styles.hamburgerLine}></div>
                </button>
                <ThemeSwitcher size={22} />
            </header>

            {/* Mobile Menu Dropdown */}
            <nav className={`${styles.mobileDropdown} ${isMenuOpen ? styles.show : ''}`}>
                <Link className={styles.navLink} to="/" onClick={closeMenu}>Home</Link>
                <Link className={styles.navLink} to="/about" onClick={closeMenu}>About</Link>
                <Link className={styles.navLink} to="/settings" onClick={closeMenu}>Settings</Link>
            </nav>

            {/* Overlay */}
            <div 
                className={`${styles.overlay} ${isMenuOpen ? styles.show : ''}`}
                onClick={closeMenu}
            />
        </>
    );
}