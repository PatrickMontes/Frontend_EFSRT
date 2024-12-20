import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPage.css'


const AdminPage = () => {
    const navigate = useNavigate();

    return(
        <div className="admin-page">
            <h1>BIENVENIDO A MASS</h1>
            <button onClick={()=> navigate("/admin/categorias")}>Administrar Categorias</button>
            <button onClick={()=> navigate("/admin/productos")}>Administrar Productos</button>
            <button onClick={()=> navigate("/admin/pedidos")}>Administrar Pedidos</button>
        </div>
    )
}

export default AdminPage;