import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/adminCategoriaPage.css'

const AdminCategoriaPage = () => {

    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        fetchCategorias();
    }, [])

    const fetchCategorias = async()=>{
        try {
            const response = await ApiService.getAllCategorias();
            setCategorias(response.listaCategorias || []);
        } catch (error) {
            console.log("Error al hacer fetching de lista categorias",  error)
        }
    }

    const handleEdit = async (id) => {
        navigate(`/admin/editar-categoria/${id}`)
    }
    const handleDelete = async(id) => {
        const confirmed = window.confirm("¿Estás seguro de eliminar esta categoria?")
        if(confirmed){
            try {
                await ApiService.eliminarCategoria(id);
                fetchCategorias();
            } catch (error) {
                console.log("Error al eliminar la categoria por ID")
            }
        }
    }

    return(
        <div className="admin-category-page">
            <div className="admin-category-list">
                <h2>Categorias</h2>
                <button onClick={()=> navigate('/admin/agregar-categoria')}>AGREGAR</button>
                <ul>
                    {categorias.map((categoria) => (
                        <li key={categoria.id}>
                            <span>{categoria.nombre}</span>
                            <div className="admin-bt">
                                    <button className="admin-btn-edit" onClick={()=> handleEdit(categoria.id)}>EDITAR</button>
                                    <button  onClick={()=> handleDelete(categoria.id)}>ELIMINAR</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AdminCategoriaPage;