import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import Componentes from './components/Componentes';
import Login from './components/Login'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/tienda' element={<Products />}></Route>
        <Route path='/componentes' element={<Componentes />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
