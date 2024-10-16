import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import { CartProvider } from './component/context/CartContext';
import ProductList from './component/common/ProductList';
import CategoryList from './component/common/CategoyList';
import LoginPage from './component/pages/LoginPage';
import '../src/style/ProductList.css'

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
          <Routes> 
          <Route path='/login' element={<LoginPage/>}/>
            <Route path="/productos" element={
                        <>
                            <CategoryList />
                            <ProductList />
                        </>
                    } />
            
          </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );

}

export default App;
