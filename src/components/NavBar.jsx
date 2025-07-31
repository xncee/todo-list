import { Link } from 'react-router-dom';
import styles from '../App.module.css'
import ThemeSwitcher from './ThemeSwitcher';

export function NavBar() {
    return (
        <div className={styles.navbar}>
            <ThemeSwitcher/>
            <Link className={styles.navLink} to={"/"}>Home</Link>
            <Link className={styles.navLink} to={"/about"}>About</Link>
            <Link className={styles.navLink} to={"/settings"}>Settings</Link>
        </div>
    );
}