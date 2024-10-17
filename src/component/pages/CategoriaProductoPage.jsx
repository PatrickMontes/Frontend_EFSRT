import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import '../../style/home.css'


const CategoriaProductoPage = () => {

    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 8;


    useEffect(() => {
        fetchProducts();
    }, [categoriaId, currentPage]);

    const fetchProducts = async () => {
        try {

            const response = await ApiService.getAllProductosPorCategoriaId(categoriaId);
            const allProductos = response.listaProductos || [];
            setTotalPages(Math.ceil(allProductos.length / itemsPerPage));
            setProductos(allProductos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'unable to fetch products by categoty id')
        }
    }


    return(
        <div className="home">
            {error ? (
                <p className="error-message">{error}</p>
            ):(
                <div>
                    <ProductList products={productos}/>
                    <Pagination  currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page)=> setCurrentPage(page)}/>
                </div>
            )}
        </div>
    )

}

export default CategoriaProductoPage;