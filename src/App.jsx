
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { NavBar } from './components/NavBar';
import { ThemeProvider } from './context/ThemeContext';
// import styles from './App.module.css';

function App() {
	return (
        <ThemeProvider>
            <Analytics />
            <SpeedInsights />
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/about' element={<About />}/>
                    <Route path='/settings' element={<Settings />}/>
                    <Route path='*' element={<PageNotFound />}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
