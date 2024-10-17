import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import '../../style/productoDetallePage.css';


const ProductoDetallePage = () => {

    const {productoId} = useParams();
    const {cart, dispatch} = useCart();
    const [producto, setProducto] = useState(null);


   useEffect(() => {
    const fetchProducto = async () => {
        try {
            const response = await ApiService.getAllProductosPorId(productoId);
            console.log(response); // Verificar la respuesta nuevamente
            setProducto(response.producto);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    fetchProducto();
}, [productoId]);

    
    
    

    const addToCart = () => {
        if (producto) {
            dispatch({type: 'ADD_ITEM', payload: producto});   
        }
    }


    const incrementItem = () => {
        if(producto){
            dispatch({type: 'INCREMENT_ITEM', payload: producto});
 
        }
    }


    const decrementItem = () => {
        if (producto) {
            const cartItem = cart.find(item => item.id === producto.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({type: 'DECREMENT_ITEM', payload: producto}); 
            }else{
                dispatch({type: 'REMOVE_ITEM', payload: producto}); 
            }
            
        }
    }

    if (!producto) {
        return <p>Loading producto details ...</p>
    }

    const cartItem = cart.find(item => item.id === producto.id);


    return(
        <div className="product-detail">
            <img src={producto?.urlImagen} alt={producto?.nombre} />
            <div className="product-info">
                <h1>{producto?.nombre}</h1>
                <p>{producto?.descripcion}</p>
                <span>{producto.precio?.toFixed(2)} soles</span>
                {cartItem ? (
                    <div className="quantity-controls">
                        <button onClick={decrementItem}>-</button>
                        <span>{cartItem.quantity}</span>
                        <button onClick={incrementItem}>+</button>
                    </div>
                ):(
                    <button onClick={addToCart}>CARRITO</button>
                )}
            </div>

        </div>
    )
}

export default ProductoDetallePage;