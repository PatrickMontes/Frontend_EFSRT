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

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [buscarEstado, currentPage]);



    const fetchOrders = async () => {

        try {
            let response;
            if(buscarEstado){
                response = await ApiService.getAllPedidoItemPorEstado(buscarEstado);
            }else{
                response = await ApiService.getAllPedidos();
            }
            const pedidoList = response.listaItemsPedido || [];

            setTotalPages(Math.ceil(pedidoList.length/itemsPerPage));
            setPedidos(pedidoList);
            setFilterPedidos(pedidoList.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage));


        } catch (error) {
            setError(error.response?.data?.mensaje || error.mensaje || 'No se pueden obtener pedidos')
            setTimeout(()=>{
                setError('')
            }, 2000)
        }
    }

    const handleFilterChange = (e) =>{
        const filterValue = e.target.value;
        setEstadoFilter(filterValue)
        setCurrentPage(1);

        if (filterValue) {
            const filtered = pedidos.filter(order => order.status === filterValue);
            setFilterPedidos(filtered.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }else{
            setFilterPedidos(pedidos.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(pedidos.length / itemsPerPage));
        }
    }


    const handleSearchStatusChange = async (e) => {
        setBuscarEstado(e.target.value);
        setCurrentPage(1);
    }

    const handleOrderDetails = (id) => {
        navigate(`/admin/pedido-detalles/${id}`)
    }


    return (
        <div className="admin-orders-page">
            <h2>Pedidos</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="filter-container">
                {/*<div className="statusFilter">
                    <label >Filtrar por Estado</label>
                    <select value={estadoFilter} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {PedidoEstado.map(status=>(
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>*/}
                <div className="searchStatus">
                <label>Buscar por Estado: </label>
                    <select value={buscarEstado} onChange={handleSearchStatusChange}>
                        <option value="">Todos</option>
                        {PedidoEstado.map(status=>(
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

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
                                <button onClick={()=> handleOrderDetails(pedido.id)}>DETALLE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page)=> setCurrentPage(page)}/>
        </div>
    )
}

export default AdminPedidoPage;