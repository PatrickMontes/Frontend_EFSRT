import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/adminCategoriaAgregar.css'

const AdminCategoriaEditar = () => {
    const { categoriaId } = useParams();
    const [nombre, setNombre] = useState('')
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchCategoria(categoriaId);
    }, [categoriaId])

    const fetchCategoria = async () => {
        try {
            const response = await ApiService.getCategoriaPorId(categoriaId);
            setNombre(response.categoria.nombre); 
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || error.message || "Error al encontrar categoria por ID");
            setTimeout(() => {
                setMensaje('');
            }, 2000);
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.actualizarCategoria(categoriaId, { nombre });
            if (response.estado === 200) { 
                setMensaje(response.mensaje);
                setTimeout(() => {
                    setMensaje('');
                    navigate("/admin/categorias");
                }, 2000);
            } else {
                setMensaje("Error inesperado al actualizar la categoría");
            }
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || error.message || "Error al guardar categoria");
        }
    }
    

    return (
        <div className="add-category-page">
            {mensaje && <p className="message">{mensaje}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>EDITAR CATEGORIA</h2>
                <input type="text" placeholder="Categoria nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <button type="submit">EDITAR</button>
            </form>
        </div>
    )

}

export default AdminCategoriaEditar;