import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import { CartProvider } from './component/context/CartContext';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import Home from './component/pages/Home';
import ProductoDetallePage from './component/pages/ProductoDetallePage';
import CategoriaListPage from './component/pages/CategoriaListPage';
import CategoriaProductoPage from './component/pages/CategoriaProductoPage';
import CartPage from './component/pages/CartPage';
import LoginPage from './component/pages/LoginPage';
import RegisterPage from './component/pages/RegisterPage';
import AdminPage from './component/admin/AdminPage';
import ProductList from './component/common/ProductList';
 


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
          <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>   
              
              <Route path='/producto/:productoId' element={<ProductoDetallePage/>} />
             <Route path='/categorias' element={<CategoriaListPage/>} />
              <Route path='/categoria/:categoriaId' element={<CategoriaProductoPage/>} />
              <Route path='/carrito' element={<CartPage/>} />

              

              {/* ADMIN */}
              <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
            </Routes>
          <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
