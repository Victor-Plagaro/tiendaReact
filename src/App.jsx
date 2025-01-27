import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Componentes } from './components/Componentes';
import Login from './components/Login';
import Perfil from './components/Perfil';
import { CartProvider } from './context/cart.jsx';
import SearchBar from './components/SearchBar.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <SearchBar />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/tienda' element={<Products />} />
          <Route path='/componentes' element={<Componentes />} />
          <Route path='/login' element={<Login />} />
          <Route path='/perfil' element={<Perfil />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;