import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";
import '../../style/cart.css';

const CartPage = () => {
    const { cart, dispatch } = useCart();
    const [message, setMessage] = useState(null); 
    const navigate = useNavigate(); 

    
    const incrementItem = (producto) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: producto });
    }

    
    const decrementItem = (producto) => {
        const cartItem = cart.find(item => item.id === producto.id);
        if (cartItem && cartItem.cantidad > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: producto });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: producto });
        }
    }


    const totalPrice = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);


    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("Debes iniciar sesión para realizar un pedido.");
            setTimeout(() => {
                setMessage('');
                navigate("/login"); 
            }, 3000);
            return;
        }

        
        const orderItems = cart.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad
        }));

        
        const orderRequest = {
            totalPrice,
            items: orderItems,
        };

        try {
            const response = await ApiService.crearPedido(orderRequest);
            console.log("Respuesta del servidor:", response); // Asegúrate de que esta línea imprima la respuesta
        
            // Verifica si el mensaje está presente en la respuesta
            if (response && response.mensaje) {
                setMessage(response.mensaje);
            }
        
            if (response.estado === 200) {
                dispatch({ type: 'CLEAR_CART' });
            }
        
            setTimeout(() => {
                setMessage('');
            }, 5000);
        
        } catch (error) {
            console.log("Error:", error);
            setMessage(error.response?.data?.mensaje || error.message || 'No se pudo realizar el pedido.');
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
                <p className="mensaje-vacio">Tu carrito está vacío</p>
            ) : (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.urlImagen} alt={item.nombre} />
                                <div>
                                    <h3>{item.nombre}</h3>
                                    <p>{item.descripcion}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decrementItem(item)}>-</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => incrementItem(item)}>+</button>
                                    </div>
                                    <span>{item.precio.toFixed(2)} soles</span>
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
