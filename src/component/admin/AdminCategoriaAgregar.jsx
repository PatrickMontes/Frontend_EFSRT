import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/adminCategoriaAgregar.css'

const AdminCategoriaAgregar = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.crearCategoria({nombre});
            if (response.estado === 200) {
                setMensaje(response.mensaje);
                setTimeout(()=>{
                    setMensaje('');
                    navigate("/admin/categorias")
                }, 2000)
            }
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || error.mensaje || "Error al agregar categoria")
        }
    }

    return(
        <div className="add-category-page">
            {mensaje && <p className="message">{mensaje}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>AGREGAR CATEGORIA</h2>
                <input type="text" placeholder="Nombre de categoria" value={nombre} onChange={(e)=> setNombre(e.target.value)} />
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    )
}

export default AdminCategoriaAgregar;