import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/adminPedidoDetallePage.css'
import ApiService from "../../service/ApiService";


const OrderStatus = ["PENDIENTE", "CONFIRMADO", "ENVIADO", "ENTREGADO", "CANCELADO", "DEVUELTO"];

const AdminPedidoDetallePage = () => {
    const { itemId } = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        fetchOrderDetails(itemId);
    }, [itemId]);

    const fetchOrderDetails = async (itemId) => {
        try {
            const response = await ApiService.getAllPedidoItemPorId(itemId);
            setOrderItems(response.listaItemsPedido);  
        } catch (error) {
            console.log(error.message || error);
        }
    };

    const handleStatusChange = (orderItemId, newStatus) => {
        setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
    };


    const handleSubmitStatusChange = async (orderItemId) => {
        try {
            await ApiService.actualizarPedidoItemEstado(orderItemId, selectedStatus[orderItemId]);
            setMensaje('El estado del ítem del pedido se actualizó correctamente');
            setTimeout(() => {
                setMensaje('');
            }, 3000);
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || error.message || 'No se pudo actualizar el estado del ítem del pedido');
        }
    };
    

    return (
        <div className="order-details-page">
            {mensaje && <div className="message">{mensaje}</div>}
            <h2>Detalles del Pedido</h2>
            {orderItems.length ? (
                orderItems.map((orderItem) => (
                    <div key={orderItem.id} className="order-item-details">
                        <div className="info">
                            <h3>Información del Pedido:</h3>
                            <p><strong>ID del Ítem:</strong><span>{orderItem.id}</span></p>
                            <p><strong>Cantidad:</strong><span>{orderItem.cantidad}</span></p>
                            <p><strong>Precio Total:</strong><span>{orderItem.precio}</span></p>
                            <p><strong>Estado:</strong><span>{orderItem.estado}</span></p>
                            <p><strong>Fecha del Pedido:</strong><span>{new Date(orderItem.creadoEn).toLocaleDateString()}</span></p>
                        </div>
                        <div className="info">
                            <h3>Información del Usuario:</h3>
                            <p><strong>Nombre:</strong><span>{orderItem.usuario.nombre}</span></p>
                            <p><strong>Email:</strong><span>{orderItem.usuario.email}</span></p>
                            <p><strong>Teléfono:</strong><span>{orderItem.usuario.numeroTelefono}</span></p>
                            <p><strong>Rol:</strong><span>{orderItem.usuario.rol}</span></p>

                            <div className="info">
                                <h3>Dirección de Envío:</h3>
                                <p><strong>País:</strong><span>{orderItem.usuario.direccion?.pais}</span></p>
                                <p><strong>Estado:</strong><span>{orderItem.usuario.direccion?.estado}</span></p>
                                <p><strong>Ciudad:</strong><span>{orderItem.usuario.direccion?.ciudad}</span></p>
                                <p><strong>Calle:</strong><span>{orderItem.usuario.direccion?.calle}</span></p>
                                <p><strong>Código Postal:</strong><span>{orderItem.usuario.direccion?.codigoPostal}</span></p>
                            </div>
                        </div>
                        <div className="order-product">
                            <h2>Información del Producto:</h2>
                            <img src={orderItem.producto.urlImagen} alt={orderItem.producto.nombre} />
                            <p><strong>Nombre:</strong><span>{orderItem.producto.nombre}</span></p>
                            <p><strong>Descripción:</strong><span>{orderItem.producto.descripcion}</span></p>
                            <p><strong>Precio:</strong><span>{orderItem.producto.precio}</span></p>
                        </div>
                        <div className="status-change">
                            <h4>Cambiar Estado</h4>

                            <div className="status-change-bottom">
                                <select className="status-option" value={selectedStatus[orderItem.id] || orderItem.estado} onChange={(e) => handleStatusChange(orderItem.id, e.target.value)}>
                                    {OrderStatus.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                <button className="update-status-button" onClick={() => handleSubmitStatusChange(orderItem.id)}>ACTUALIZAR</button>
                            </div>
                        </div>
                    </div>

                ))
            ) : (
                <p>Cargando detalles del pedido...</p>
            )}
        </div>
    );
}

export default AdminPedidoDetallePage;
