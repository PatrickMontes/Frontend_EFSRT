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
import PerfilPage from './component/pages/PerfilPage';
import DireccionPage from './component/pages/DireccionPage';
import AdminCategoriaPage from './component/admin/AdminCategoriaPage';
import AdminCategoriaAgregar from './component/admin/AdminCategoriaAgregar';
import AdminCategoriaEditar from './component/admin/AdminCategoriaEditar';

 


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
          <Navbar />
            <Routes>
              {/* AUTENTICACION */}
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>   
              
              
              {/* CLIENTE */}
              <Route path='/producto/:productoId' element={<ProductoDetallePage/>} />
             <Route path='/categorias' element={<CategoriaListPage/>} />
              <Route path='/categoria/:categoriaId' element={<CategoriaProductoPage/>} />
              <Route path='/carrito' element={<CartPage/>} />


              {/* PERFIL */}
              <Route path='/perfil' element={<ProtectedRoute element={<PerfilPage/>} />} />
              <Route path='/agregar-direccion' element={<ProtectedRoute element={<DireccionPage/>} />} />
              <Route path='/editar-direccion' element={<ProtectedRoute element={<DireccionPage/>} />} />


              {/* ADMIN */}
              <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
              <Route path='/admin/categorias' element={<AdminRoute element={<AdminCategoriaPage/>} />} />
              <Route path='/admin/agregar-categoria' element={<AdminRoute element={<AdminCategoriaAgregar/>} />} />
              <Route path='/admin/editar-categoria/:categoriaId' element={<AdminRoute element={<AdminCategoriaEditar/>} />} />
            </Routes>
          <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
