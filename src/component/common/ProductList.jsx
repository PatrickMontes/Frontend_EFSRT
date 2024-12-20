import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../../style/productList.css';


const ProductList = ({ products }) => {
    const { cart, dispatch } = useCart();

    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const incrementItem = (product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product });
    };

    const decrementItem = (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.cantidad > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: product });
        }
    };

    return (
        <div className="product-list">
            {products.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                return (
                    <div className="product-item" key={index}>
                        <Link to={`/producto/${product.id}`}>
                            <img src={product.urlImagen} alt={product.nombre} className="product-image" />
                            <h3>{product.nombre}</h3>
                            <p>{product.descripcion}</p>
                            <span>{product.precio?.toFixed(2)} soles</span>
                        </Link>
                        {cartItem ? (
                            <div className="quantity-controls">
                                <button onClick={() => decrementItem(product)}> - </button>
                                <span>{cartItem.cantidad}</span>
                                <button onClick={() => incrementItem(product)}> + </button>
                            </div>
                        ) : (
                            <button onClick={() => addToCart(product)}>CARRITO</button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
