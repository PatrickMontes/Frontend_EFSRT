import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/perfilPage.css';
import Pagination from "../common/Pagination";

const PerfilPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [estadoFiltro, setEstadoFiltro] = useState(""); // Filtro por estado
    const [fechaInicio, setFechaInicio] = useState(""); // Filtro por fecha inicio
    const [fechaFin, setFechaFin] = useState(""); // Filtro por fecha fin
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getUsuarioInfo();
            setUserInfo(response.usuario);
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch user info');
        }
    };

    if (!userInfo) {
        return <div>Cargando...</div>;
    }

    const handleAddressClick = () => {
        navigate(userInfo.direccion ? '/editar-direccion' : '/agregar-direccion');
    };

    const listaItemsPedido = userInfo.listaItemsPedido || [];

    // **Aplicar filtros**
    const pedidosFiltrados = listaItemsPedido.filter(order => {
        // Filtro por estado
        const coincideEstado = estadoFiltro ? order.estado === estadoFiltro : true;
        return coincideEstado
    });

    // Paginación
    const totalPages = Math.ceil(pedidosFiltrados.length / itemsPerPage);
    const paginatedOrders = pedidosFiltrados.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="profile-page">
            <h2>Bienvenido {userInfo.nombre}</h2>

            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <p><strong>Nombre: </strong><span className="other-font">{userInfo.nombre}</span></p>
                    <p><strong>Email: </strong><span className="other-font">{userInfo.email}</span></p>
                    <p><strong>Numero Telefonico: </strong><span className="other-font">{userInfo.numeroTelefono}</span></p>

                    <div>
                        <h3>Direccion:</h3>
                        {userInfo.direccion ? (
                            <div>
                                <p><strong>Calle: </strong><span className="other-font">{userInfo.direccion.calle}</span></p>
                                <p><strong>Ciudad: </strong><span className="other-font">{userInfo.direccion.ciudad}</span></p>
                                <p><strong>Estado: </strong><span className="other-font">{userInfo.direccion.estado}</span></p>
                                <p><strong>Codigo Postal: </strong><span className="other-font">{userInfo.direccion.codigoPostal}</span></p>
                                <p><strong>Pais: </strong><span className="other-font">{userInfo.direccion.pais}</span></p>
                            </div>
                        ) : (
                            <p>No hay información de dirección disponible</p>
                        )}
                        <button className="profile-button" onClick={handleAddressClick}>
                            {userInfo.direccion ? "EDITAR" : "AGREGAR"}
                        </button>
                    </div>

                    <h3>Pedido Historial:</h3>
                    {/* Filtros */}
                    <div>
                        <label>
                            Estado:
                            <select value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}>
                                <option value="">Todos</option>
                                <option value="PENDIENTE">Pendiente</option>
                                <option value="CONFIRMADO">Confirmado</option>
                                <option value="ENVIADO">Enviado</option>
                                <option value="ENTREGADO">Entregado</option>
                                <option value="CANCELADO">Cancelado</option>
                            </select>
                        </label>       
                    </div>

                    {/* Lista de pedidos */}
                    <ul>
                        {paginatedOrders.map(order => (
                            <li key={order.id}>
                                <img src={order.producto?.urlImagen} alt={order.producto.nombre} />
                                <div>
                                    <p><strong>Nombre: </strong><span className="other-font">{order.producto.nombre}</span></p>
                                    <p><strong>Estado: </strong><span className="other-font">{order.estado}</span></p>
                                    <p><strong>Cantidad: </strong><span className="other-font">{order.cantidad}</span></p>
                                    <p><strong>Precio: </strong><span className="other-font">{order.precio.toFixed(2)}</span></p>
                                </div>
                            </li>
                        ))}
                    </ul>
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

export default PerfilPage;
