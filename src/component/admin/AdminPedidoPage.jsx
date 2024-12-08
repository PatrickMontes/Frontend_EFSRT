import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPedidoPage.css'
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const PedidoEstado = ["PENDIENTE", "CONFIRMADO", "ENVIADO", "ENTREGADO", "CANCELADO", "DEVUELTO"];

const AdminPedidoPage = () => {
    const [pedidos, setPedidos] = useState([]);
    const [filterPedidos, setFilterPedidos] = useState([]);
    const [estadoFilter, setEstadoFilter] = useState('');
    const [buscarEstado, setBuscarEstado] = useState('');
    const [buscarCliente, setBuscarCliente] = useState(''); // Nueva variable para el filtro de cliente

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [buscarEstado, currentPage, buscarCliente]);

    const fetchOrders = async () => {
        try {
            let response;
            if (buscarEstado) {
                response = await ApiService.getAllPedidoItemPorEstado(buscarEstado);
            } else {
                response = await ApiService.getAllPedidos();
            }
            const pedidoList = response.listaItemsPedido || [];

            // Filtrar por cliente si el campo de búsqueda tiene texto
            const filteredByCliente = buscarCliente
                ? pedidoList.filter(pedido =>
                    pedido.usuario.nombre.toLowerCase().includes(buscarCliente.toLowerCase())
                )
                : pedidoList;

            setTotalPages(Math.ceil(filteredByCliente.length / itemsPerPage));
            setPedidos(filteredByCliente);
            setFilterPedidos(
                filteredByCliente.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            );
        } catch (error) {
            setError(error.response?.data?.mensaje || error.message || 'No se pueden obtener pedidos');
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    };

    const handleSearchStatusChange = (e) => {
        setBuscarEstado(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchClientChange = (e) => {
        setBuscarCliente(e.target.value); // Actualiza el filtro de cliente
        setCurrentPage(1);
    };

    const handleOrderDetails = (id) => {
        navigate(`/admin/pedido-detalles/${id}`);
    };

    return (
        <div className="admin-orders-page">
            <h2>Pedidos</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="filter-container">
                <div className="searchStatus">
                    <label>Buscar por Estado: </label>
                    <select value={buscarEstado} onChange={handleSearchStatusChange}>
                        <option value="">Todos</option>
                        {PedidoEstado.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="statusFilter">
                    <label>Buscar por Cliente: </label>
                    <input
                        type="text"
                        value={buscarCliente}
                        onChange={handleSearchClientChange}
                        placeholder="Nombre del cliente"
                    />
                </div>
            </div>

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Pedido ID</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Precio</th>
                        <th>Fecha Pedido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {filterPedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td className="table-number">{pedido.id}</td>
                            <td>{pedido.usuario.nombre}</td>
                            <td>{pedido.estado}</td>
                            <td className="table-number">${pedido.precio.toFixed(2)}</td>
                            <td className="table-number">{new Date(pedido.creadoEn).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleOrderDetails(pedido.id)}>DETALLE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default AdminPedidoPage;
