import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Perfil = () => {
    const { authenticated } = useContext(AuthContext);

    if (!authenticated) {
        return <div>No estás autenticado</div>;
    }

    return (
        <div>
            <h1>Perfil</h1>
            <p>Bienvenido a tu perfil</p>
        </div>
    );
};

export default Perfil;
