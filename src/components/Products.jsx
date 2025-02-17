import React, { useEffect, useState } from 'react';
import './styles/products.css'; 
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import { useCart } from '../hooks/useCart.js';

// Componente Products que muestra una lista de productos
export function Products() {
  // Obtiene las funciones y el estado del carrito desde el hook useCart
  const { addToCart, removeFromCart, cart } = useCart();
  // Estado local para almacenar los productos
  const [products, setProducts] = useState([]);

  // useEffect para obtener los productos de una API cuando el componente se monta
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Función para verificar si un producto está en el carrito
  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id);
  };

  return (
    <main className='products'>
      <ul>
        {/* Mapea los primeros 10 productos y renderiza un elemento de lista para cada uno */}
        {products.slice(0, 10).map(product => {
          // Verifica si el producto está en el carrito
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              {/* Imagen del producto */}
              <img src={product.image} alt={product.title} />
              <div>
                {/* Título y precio del producto */}
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                {/* Botón para añadir o remover el producto del carrito */}
                <button
                  onClick={() => {
                    isProductInCart ? removeFromCart(product.id) : addToCart(product);
                  }}
                >
                  {/* Icono que cambia según si el producto está en el carrito */}
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}