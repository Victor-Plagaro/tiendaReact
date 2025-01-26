import { useContext } from 'react'
import { CartContext } from '../context/cart.jsx'

// Hook personalizado useCart para acceder al contexto del carrito
export const useCart = () => {
  // Obtiene el contexto del carrito
  const context = useContext(CartContext)

  // Si el contexto es undefined, lanza un error indicando que debe ser usado dentro de un CartProvider
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  // Retorna el contexto del carrito
  return context
}