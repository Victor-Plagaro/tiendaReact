import React, { useContext, useEffect } from 'react';
import "./styles/switchTheme.css";
import { ThemeContext } from './ThemeContext';

export const Switch = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="container-switch">
            <span>{theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
            <label className="switch">
                <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                <span className="slider"></span>
            </label>
        </div>
    );
};