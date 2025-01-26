import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { Componentes } from './components/Componentes';
import Login from './components/Login';
import { CartProvider } from './context/cart.jsx';
import SearchBar from './components/SearchBar.jsx';

function App() {
  return (
    <CartProvider>
      <Header />
      <SearchBar />
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