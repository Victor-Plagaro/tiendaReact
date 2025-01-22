import { NavLink } from "react-router-dom";
import "../styles/header.css";
import { Switch } from "./SwitchTheme";
import { ThemeProvider } from "./ThemeContext";

export function header() {
  return (
    <ThemeProvider>
      <header className="header">
        <div className="logo">
          <h1>My Store</h1>
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
              Nav3
            </li>
            <li>
              Contacto
            </li>
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

export default header;