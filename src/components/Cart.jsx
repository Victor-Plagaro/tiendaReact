import '../styles/Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'

// Componente CartItem que representa un producto en el carrito
function CartItem ({ image, price, title, quantity, addToCart }) {
  return (
    <li>
      {/* Imagen del producto */}
      <img
        src={image}
        alt={title}
      />
      <div>
        {/* Título y precio del producto */}
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        {/* Cantidad del producto y botón para añadir más */}
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

// Componente Cart que representa el carrito de compras
export function Cart () {
  // Genera un ID único para el checkbox del carrito
  const cartCheckboxId = useId()
  // Obtiene el estado del carrito y las funciones para manipularlo desde el hook useCart
  const { cart, clearCart, addToCart } = useCart()

  return (
    <>
      {/* Botón para abrir/cerrar el carrito */}
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      {/* Checkbox oculto que controla la visibilidad del carrito */}
      <input id={cartCheckboxId} type='checkbox' hidden />

      {/* Contenedor del carrito */}
      <aside className='cart'>
        <ul>
          {/* Mapea los productos del carrito y renderiza un CartItem para cada uno */}
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        {/* Botón para vaciar el carrito */}
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}