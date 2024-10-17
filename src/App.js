import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import { CartProvider } from './component/context/CartContext';

import LoginPage from './component/pages/LoginPage';
import '../src/style/ProductList.css'
import RegisterPage from './component/pages/RegisterPage';

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
          <Routes> 

              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>   
                       
          </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );

}

export default App;
