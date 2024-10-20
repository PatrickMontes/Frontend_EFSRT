import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import PerfilPage from './component/pages/PerfilPage';
import DireccionPage from './component/pages/DireccionPage';
import AdminCategoriaPage from './component/admin/AdminCategoriaPage';
import AdminCategoriaAgregar from './component/admin/AdminCategoriaAgregar';
import AdminCategoriaEditar from './component/admin/AdminCategoriaEditar';
import AdminProductoPage from './component/admin/AdminProductoPage';
import AdminProductoAgregar from './component/admin/AdminProductoAgregar';
import AdminProductoEditar from './component/admin/AdminProductoEditar';
import AdminPedidoPage from './component/admin/AdminPedidoPage';
import AdminPedidoDetallePage from './component/admin/AdminPedidoDetallePage';

 


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
              <Route path='/admin/categorias' element={<AdminRoute element={<AdminCategoriaPage/>} />} />
              <Route path='/admin/agregar-categoria' element={<AdminRoute element={<AdminCategoriaAgregar/>} />} />
              <Route path='/admin/editar-categoria/:categoriaId' element={<AdminRoute element={<AdminCategoriaEditar/>} />} />

              <Route path='/admin/productos' element={<AdminRoute element={<AdminProductoPage/>} />} />
              <Route path='/admin/agregar-producto' element={<AdminRoute element={<AdminProductoAgregar/>} />} />
              <Route path='/admin/editar-producto/:productoId' element={<AdminRoute element={<AdminProductoEditar/>} />} />

              <Route path='/admin/pedidos' element={<AdminRoute element={<AdminPedidoPage/>} />} />
              <Route path='/admin/pedido-detalles/:itemId' element={<AdminRoute element={<AdminPedidoDetallePage/>} />} />

            </Routes>
          <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
