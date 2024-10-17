import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Footer from './component/common/Footer';
import AdminPage from './component/admin/AdminPage';
import { CartProvider } from './component/context/CartContext';
import LoginPage from './component/pages/LoginPage';
import RegisterPage from './component/pages/RegisterPage';
import AdminCategoryPage from './component/admin/AdminCategoryPage';
import AddCategorys from './component/admin/AddCategorys';
import EditCategory from './component/admin/EditCategory';


function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
          <Routes> 

              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>   

              <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
              <Route path='/admin/categories' element={<AdminRoute element={<AdminCategoryPage/>} />} /> 
              <Route path='/admin/add-category' element={<AdminRoute element={<AddCategorys/>} />} />  
              <Route path='/admin/edit-category/:id' element={<AdminRoute element={<EditCategory/>} />} />        
          </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );

}

export default App;
