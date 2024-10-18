import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPage.css'


const AdminPage = () => {
    const navigate = useNavigate();

    return(
        <div className="admin-page">
            <h1>BIENVENIDO A MASS</h1>
            <button onClick={()=> navigate("/admin/categories")}>Administrar Categorias</button>
            <button onClick={()=> navigate("/admin/products")}>Administrar Productos</button>
            <button onClick={()=> navigate("/admin/orders")}>Administrar Ordenes</button>
        </div>
    )
}

export default AdminPage;