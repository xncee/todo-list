
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from '../context/ThemeContext';
import styles from '../App.module.css'
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "preferences";

export default function ThemeSwitcher() {
    const { toggleTheme, isDark, setDark } = useTheme();
    const userPreferences = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

    useEffect(() => {
        setDark(userPreferences.darkMode)
    }, [setDark, userPreferences.darkMode]);

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
                {isDark? <MdOutlineLightMode size={36} /> : <MdOutlineDarkMode size={36} />}
            </button>
        </div>
    );
}