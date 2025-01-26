import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Componentes } from './components/Componentes';
import Login from './components/Login'; // Cambiado a importación por defecto

import { CartProvider } from './context/cart.jsx';

function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/tienda' element={<Products />} />
        <Route path='/componentes' element={<Componentes />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
