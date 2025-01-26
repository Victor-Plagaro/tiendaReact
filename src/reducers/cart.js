// Estado inicial del carrito, se obtiene del localStorage o se inicializa como un array vacío
export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

// Tipos de acciones para el carrito
export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

// Actualiza el localStorage con el estado del carrito
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

// Objeto que contiene las funciones para actualizar el estado según la acción
const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
        ...state.slice(productInCartIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    // Si el producto no está en el carrito, lo añade con cantidad 1
    const newState = [
      ...state,
      {
        ...action.payload, // producto
        quantity: 1
      }
    ]

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    // Elimina el producto del carrito
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    // Vacía el carrito
    updateLocalStorage([])
    return []
  }
}

// Reducer del carrito, actualiza el estado según la acción
export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}