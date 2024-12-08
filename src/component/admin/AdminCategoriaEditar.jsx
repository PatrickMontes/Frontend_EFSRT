import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../style/adminCategoriaAgregar.css';

const AdminCategoriaEditar = () => {
    const { categoriaId } = useParams();
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategoria(categoriaId);
    }, [categoriaId]);

    const fetchCategoria = async () => {
        try {
            const response = await ApiService.getCategoriaPorId(categoriaId);
            setNombre(response.categoria.nombre); 
        } catch (error) {
            toast.error(
                error.response?.data?.mensaje ||
                error.message ||
                "Error al encontrar categoría por ID"
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.actualizarCategoria(categoriaId, { nombre });
            if (response.estado === 200) { 
                toast.success(response.mensaje);
                setTimeout(() => {
                    navigate("/admin/categorias");
                }, 2000);
            } else {
                toast.error("Error inesperado al actualizar la categoría");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.mensaje ||
                error.message ||
                "Error al guardar la categoría"
            );
        }
    };

    return (
        <div className="add-category-page">
            <form onSubmit={handleSubmit} className="category-form">
                <h2>EDITAR CATEGORIA</h2>
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button type="submit">EDITAR</button>
            </form>
        </div>
    );
};

export default AdminCategoriaEditar;
