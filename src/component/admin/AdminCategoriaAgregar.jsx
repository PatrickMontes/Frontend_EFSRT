import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../style/adminCategoriaAgregar.css';

const AdminCategoriaAgregar = () => {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.crearCategoria({ nombre });
            if (response.estado === 200) {
                toast.success(response.mensaje);
                setTimeout(() => {
                    navigate("/admin/categorias");
                }, 2000);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.mensaje ||
                error.message ||
                "Error al agregar la categoría"
            );
        }
    };

    return (
        <div className="add-category-page">
            <form onSubmit={handleSubmit} className="category-form">
                <h2>AGREGAR CATEGORIA</h2>
                <input
                    type="text"
                    placeholder="Nombre de categoria"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    );
};

export default AdminCategoriaAgregar;
