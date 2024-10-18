import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import '../../style/home.css';

const Home = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let allProducts = [];
                const queryParams = new URLSearchParams(location.search);
                const searchItem = queryParams.get('search');

                if (searchItem) {
                    // Si hay un valor de búsqueda, llamar a la API con dicho valor
                    const response = await ApiService.buscar(searchItem);
                    allProducts = response.listaProductos || [];  
                } else {
                    // Si no hay valor de búsqueda, obtener todos los productos
                    const response = await ApiService.getAllProductos();
                    allProducts = response.listaProductos || [];
                }

                setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
                setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'No se pueden obtener los productos');
            }
        };

        fetchProducts();
    }, [location.search, currentPage]);

    return (
        <div className="home">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <ProductList products={products} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
