import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminProductoPage.css';
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AdminProductoPage = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const fetchProductos = async () => {
        try {
            const response = await ApiService.getAllProductos();
            const listaProductos = response.listaProductos || [];
            setTotalPages(Math.ceil(listaProductos.length / itemsPerPage));
            setProductos(listaProductos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.mensaje || error.mensaje || 'Unable to fetch products');
        }
    };

    useEffect(() => {
        fetchProductos();
    }, [currentPage]);

    const handleEdit = (id) => {
        navigate(`/admin/editar-producto/${id}`);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await ApiService.eliminarProducto(id);
                Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
                fetchProductos();
            } catch (error) {
                Swal.fire('Error', error.response?.data?.mensaje || error.mensaje || 'No se puede eliminar el producto', 'error');
                setError(error.response?.data?.mensaje || error.mensaje || 'No se puede eliminar el producto');
            }
        }
    };

    return (
        <div className="admin-product-list">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <h2>Productos</h2>
                    <ul>
                        {productos.map((producto) => (
                            <li key={producto.id}>
                                <span>{producto.nombre}</span>
                                <span>{producto.descripcion}</span>
                                <button className="product-btn" onClick={() => handleEdit(producto.id)}>EDITAR</button>
                                <button className="product-btn-delete" onClick={() => handleDelete(producto.id)}>ELIMINAR</button>
                            </li>
                        ))}
                    </ul>
                    <button className="admin-category-button-add" onClick={() => { navigate('/admin/agregar-producto'); }}>AGREGAR</button>
                    <Pagination className="pagination" currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                </div>
            )}
        </div>
    );
};

export default AdminProductoPage;
