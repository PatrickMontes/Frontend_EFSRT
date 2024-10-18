import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/categoriaListPage.css";

const CategoriaListPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategorias();
        fetchProductos(); 
    }, []);

    const fetchCategorias = async () => {
        try {
            const response = await ApiService.getAllCategorias();
            setCategorias(response.listaCategorias || []);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to fetch categories");
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await ApiService.getAllProductos(); 
            setProductos(response.listaProductos || []); 
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to fetch products");
        }
    };

    return (
        <div className="category-list-container">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <div className="category-carousel">
                        {categorias.map((category) => (
                            <div key={category.id} className="category-item">
                                <button onClick={() => navigate(`/categoria/${category.id}`)}>
                                    {category.nombre}
                                </button>
                            </div>
                        ))}
                    </div>

        
                    <div className="product-list">
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <div key={producto.id} className="product-item">
                                    <img src={producto.urlImagen} alt={producto.nombre} className="product-image" />
                                    <h3>{producto.nombre}</h3>
                                    <p>{producto.descripcion}</p>
                                    <span>S/ {producto.precio?.toFixed(2)} </span>
                                </div>
                            ))
                        ) : (
                            <p>No hay productos disponibles.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoriaListPage;
