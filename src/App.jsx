import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Products from './components/Products'

function App() {

  return (
    <>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path='/tienda' element={<Products></Products>}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
