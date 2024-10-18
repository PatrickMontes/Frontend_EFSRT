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
import LoginPage from './component/pages/LoginPage';
import RegisterPage from './component/pages/RegisterPage';
import AdminPage from './component/admin/AdminPage';
 

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

              {/* ADMIN */}
              <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
            </Routes>
          <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
