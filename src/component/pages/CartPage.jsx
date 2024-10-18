import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";
import '../../style/cart.css';

const CartPage = () => {
    const { cart, dispatch } = useCart(); // Contexto del carrito
    const [message, setMessage] = useState(null); // Estado del mensaje
    const navigate = useNavigate(); // Navegación para redirigir

    // Incrementar cantidad de un producto
    const incrementItem = (producto) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: producto });
    }

    // Decrementar cantidad o eliminar producto
    const decrementItem = (producto) => {
        const cartItem = cart.find(item => item.id === producto.id);
        if (cartItem && cartItem.cantidad > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: producto });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: producto });
        }
    }

    // Calcular el precio total del carrito
    const totalPrice = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

    // Manejar el proceso de compra
    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("Debes iniciar sesión para realizar un pedido.");
            setTimeout(() => {
                setMessage('');
                navigate("/login"); // Redirige al login
            }, 3000);
            return;
        }

        // Preparar los items del pedido
        const orderItems = cart.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad
        }));

        // Crear la solicitud de pedido
        const orderRequest = {
            totalPrice,
            items: orderItems,
        };

        try {
            const response = await ApiService.crearPedido(orderRequest); // Llamar al servicio API
            setMessage(response.message);

            setTimeout(() => {
                setMessage('');
            }, 5000);

            // Si la respuesta es correcta, limpiar el carrito
            if (response.status === 200) {
                dispatch({ type: 'CLEAR_CART' });
                navigate("/order-confirmation"); // Redirige a confirmación de pedido
            }

        } catch (error) {
            // Manejar errores
            setMessage(error.response?.data?.message || error.message || 'No se pudo realizar el pedido.');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    return (
        <div className="cart-page">
            <h1>Carrito de Compras</h1>
            {message && <p className="response-message">{message}</p>}

            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.urlImagen} alt={item.nombre} />
                                <div>
                                    <h2>{item.nombre}</h2>
                                    <p>{item.descripcion}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decrementItem(item)}>-</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => incrementItem(item)}>+</button>
                                    </div>
                                    <span>${item.precio.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    <button className="checkout-button" onClick={handleCheckout}>Realizar Pedido</button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
