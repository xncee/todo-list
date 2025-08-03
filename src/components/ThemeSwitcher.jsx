
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/css/App.module.css';

const LOCAL_STORAGE_KEY = "preferences";

export default function ThemeSwitcher(props) {
    const { toggleTheme, isDark } = useTheme();
    const userPreferences = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

    const updateUserPreference = () => {
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({...userPreferences, darkMode: !isDark })
        );
    }

    const handleThemeChange = () => {
        toggleTheme();
        updateUserPreference();
    };

    return (
        <div>
            <button
                className={styles.themeButton}
                onClick={handleThemeChange}
            >
                {isDark? <MdOutlineLightMode size={props.size} /> : <MdOutlineDarkMode size={props.size} />}
            </button>
        </div>
    );
}