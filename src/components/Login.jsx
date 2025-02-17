import React, { useState, useContext } from 'react'; // Importamos React y algunos hooks
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la navegación
import { AuthContext } from '../context/AuthContext'; // Importamos el contexto de autenticación
import "./styles/login.css"; // Importamos los estilos CSS

const Login = () => {
    // Definimos los estados locales para email y password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Obtenemos la función setAuthenticated del contexto de autenticación
    const { setAuthenticated } = useContext(AuthContext);
    
    // Obtenemos la función navigate para redirigir al usuario
    const navigate = useNavigate();

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        console.log('Email:', email); // Imprimimos el email en la consola
        console.log('Password:', password); // Imprimimos la contraseña en la consola
        setAuthenticated(true); // Establecemos el estado de autenticación a verdadero
        navigate('/perfil'); // Redirigimos al usuario a la página de perfil
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="login-box">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <div className='group-btn'>
                        <button type="submit">Login</button>
                        <button type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;