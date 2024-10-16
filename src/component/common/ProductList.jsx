import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import '../../style/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ApiService.getAllProductos();
                console.log('Datos recibidos:', data);
                if (data.listaProductos && Array.isArray(data.listaProductos)) {
                    setProducts(data.listaProductos);
                } else {
                    console.error("Los datos no contienen un arreglo de productos:", data);
                    setError("Formato de datos inesperado.");
                }
            } catch (error) {
                setError("Hubo un Error al Cargar los Productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Cargando Productos ....</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-list-product">
    <div className="product-container">
        {products.map((producto) => (
            <div className="card" key={producto.id}>
                <img src={producto.urlImagen} alt={producto.nombre} className="product-image" />
                <div className="content-product">
                    <p className="product-description">{producto.descripcion}</p>
                    <p className="product-price">S/{producto.precio}0</p>

                    <div className="card-buttons">
                        <button className="add-to-cart-button">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
    );
};

export default ProductList;