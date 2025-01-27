import React, { createContext, useReducer } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cart';

// Crea el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Usa useReducer en lugar de useState
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // Función para eliminar un producto del carrito por su ID
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    // Proveedor del contexto que pasa el estado del carrito y las funciones para manipularlo
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};