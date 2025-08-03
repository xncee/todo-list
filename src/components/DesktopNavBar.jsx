import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import styles from '../styles/css/App.module.css';

export default function DesktopNavBar() {
    return (
        <nav className={styles.desktopNavBar}>
            <Link className={styles.navLink} to="/">Home</Link>
            <Link className={styles.navLink} to="/about">About</Link>
            <Link className={styles.navLink} to="/settings">Settings</Link>
            <ThemeSwitcher size={18} />
        </nav>
    );
}