import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import { Switch } from "./SwitchTheme";
import { ThemeProvider } from "./ThemeContext";

export function Header() {
  return (
    <ThemeProvider>
      <header className="header">
        <div className="logo">
          <h1>My Store</h1>
        </div>
        <nav className="navbar-top">
          <ol className="list-navbar">
            <li><NavLink to='/tienda'>Tienda</NavLink></li>
            <li>Nav2</li>
            <li>Nav3</li>
            <li>Contacto</li>
          </ol>
        </nav>
        <div className="login">
          <Switch />
          <span>Login</span>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;