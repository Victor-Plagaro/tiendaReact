import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import { Switch } from "./SwitchTheme";
import { ThemeProvider } from "./ThemeContext";
import { Cart } from './Cart';

export const Header = () => {

  return (
    <ThemeProvider>
      <header className="header">
        <div className="logo">
          <h1>Mi Tienda</h1>
        </div>
        <nav className="navbar-top">
          <ol className="list-navbar">
            <li>
              <NavLink to='/tienda'>Tienda</NavLink>
            </li>
            <li>
              <NavLink to='/componentes'>Componentes</NavLink>
            </li>
            <li>
              Nav 3
            </li>
            <li>
              Nav 4
            </li>
          </ol>
        </nav>
        <div className="login">
          <Switch />
          <span> 
            <NavLink to='/login'>Login</NavLink>
          </span>
        </div>
        <div>
          <Cart />
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;