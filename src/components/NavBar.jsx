import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import styles from '../App.module.css'

export function NavBar() {
    return (
        <div className={styles.navbar}>
            <Link className={styles.navLink} to={"/"}>Home</Link>
            <Link className={styles.navLink} to={"/about"}>About</Link>
            <Link className={styles.navLink} to={"/settings"}>Settings</Link>
            <ThemeSwitcher size={18} />
        </div>
    );
}