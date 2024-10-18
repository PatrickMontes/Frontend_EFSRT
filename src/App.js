import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './component/context/CartContext';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import Home from './component/pages/Home';
import ProductoDetallePage from './component/pages/ProductoDetallePage';
import CategoriaListPage from './component/pages/CategoriaListPage';
import CategoriaProductoPage from './component/pages/CategoriaProductoPage';
import CartPage from './component/pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
          <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/producto/:productoId' element={<ProductoDetallePage/>} />
              <Route path='/categorias' element={<CategoriaListPage/>} />
              <Route path='/categoria/:categoriaId' element={<CategoriaProductoPage/>} />
              <Route path='/carrito' element={<CartPage/>} />
            </Routes>
          <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
