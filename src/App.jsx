import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Products from './components/Products';
import Componentes from './components/Componentes';

function App() {
  return (
    <>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path='/tienda' element={<Products />}></Route>
            <Route path='/componentes' element={<Componentes />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
