import { createContext, useState, useContext, useEffect } from 'react';
import { themes } from '../styles/themes';

const ThemeContext = createContext();

const LOCAL_STORAGE_KEY = "preferences";
const loadDarkModePreference = () => {
    try {
        const prefs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        return !!prefs.darkMode;
    } catch {
        return false;
    }
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setDark] = useState(loadDarkModePreference());
    const theme = isDark ? themes.dark : themes.light;

    // Inject CSS variables into the document root
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
        });
    }, [theme]);

    const toggleTheme = () => setDark(prev => !prev);
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark, setDark: setDark }}>
        {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);