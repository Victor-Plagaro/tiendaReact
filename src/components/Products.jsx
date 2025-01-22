import React, { useEffect, useState } from "react"
import "../styles/products.css"

function Products() {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para gestionar el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await res.json();
        setProducts(data); // Guardar los productos en el estado
      } catch (err) {
        setError(err.message); // Guardar el error en caso de fallo
      } finally {
        setLoading(false); // Desactivar el indicador de carga
      }
    };
  
    fetchProducts();
  }, []);
  
  if (loading) {
    return <p>Cargando productos...</p>; // Mostrar mensaje mientras se cargan los productos
  }

  if (error) {
    return <p>Error: {error}</p>; // Mostrar error si ocurre
  }

  return (
    <main className="products">
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <img src={product.image} alt={product.title} width="100" />
            <div>
                <strong>{product.title} - {product.price}</strong>
            </div>
            <div>
                <button>Add buy</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Products; // Cambiado a mayúscula inicial