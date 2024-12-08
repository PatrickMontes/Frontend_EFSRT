import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../../style/adminCategoriaPage.css';

const AdminCategoriaPage = () => {

    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await ApiService.getAllCategorias();
            setCategorias(response.listaCategorias || []);
        } catch (error) {
            console.log("Error al hacer fetching de lista categorias", error);
        }
    };

    const handleEdit = async (id) => {
        navigate(`/admin/editar-categoria/${id}`);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro de eliminar esta categoría?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await ApiService.eliminarCategoria(id);
                Swal.fire(
                    'Eliminado!',
                    'La categoría ha sido eliminada.',
                    'success'
                );
                fetchCategorias();
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al eliminar la categoría.',
                    'error'
                );
                console.log("Error al eliminar la categoría por ID", error);
            }
        }
    };

    return (
        <div className="admin-category-page">
            <div className="admin-category-list">
                <h2>Categorias</h2>
                <ul>
                    {categorias.map((categoria) => (
                        <li key={categoria.id}>
                            <span>{categoria.nombre}</span>
                            <div className="admin-bt">
                                <button className="admin-btn-edit" onClick={() => handleEdit(categoria.id)}>EDITAR</button>
                                <button onClick={() => handleDelete(categoria.id)}>ELIMINAR</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="admin-category-button-add" onClick={() => navigate('/admin/agregar-categoria')}>AGREGAR</button>
            </div>
        </div>
    );
};

export default AdminCategoriaPage;
