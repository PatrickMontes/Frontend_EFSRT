import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import '../../style/categoryList.css'

const CategoryList = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ApiService.getAllCategorias();
                console.log('Datos Encontrados : ', data);
                if (data.listaCategorias && Array.isArray(data.listaCategorias)) {
                    setCategory(data.listaCategorias);
                } else {
                    console.error("Los Datos no contienen un arreglo de Categorias :", data);
                    setError("Formato de datos inesperado.");
                }
            } catch (error) {
                setError("Hubo un Error al Cargar las Categorias");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return <div>Cargando las Categorias ....</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div  className="container">
            <div className="category-container">
                {category.map((categoria) => (
                    <div className="category-card" key={categoria.id}>
                        <a>{categoria.nombre}</a> 
                    </div>
                ))}
            </div>
        </div>

        
    );
};

export default CategoryList;