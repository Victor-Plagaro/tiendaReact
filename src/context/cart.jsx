import React, { createContext, useState } from 'react';

// Crea el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Estado local para almacenar los productos del carrito
  const [cart, setCart] = useState([]);

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Función para eliminar un producto del carrito por su ID
  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  return (
    // Proveedor del contexto que pasa el estado del carrito y las funciones para manipularlo
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};