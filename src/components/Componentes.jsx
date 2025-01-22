import "../styles/componentes.css";
import { ThemeProvider } from "./ThemeContext";
import { useState } from "react";

export function Componentes() {
  const [hiddenComponents, setHiddenComponents] = useState([false, false, false]);

  const toggleComponentVisibility = (index) => {
    const newHiddenComponents = [...hiddenComponents];
    newHiddenComponents[index] = !newHiddenComponents[index];
    setHiddenComponents(newHiddenComponents);
  };

  const toggleAllComponents = () => {
    const allHidden = hiddenComponents.every(hidden => hidden);
    setHiddenComponents([!allHidden, !allHidden, !allHidden]);
  };

  return (
    <ThemeProvider>
      <section>
        <div className="componentes-container">
          {hiddenComponents.map((hidden, index) => (
            <div key={index} className="group-componentes" style={{ display: hidden ? 'none' : 'flex' }}>
              <div className="componente">Componente {index + 1}</div>
              <button onClick={() => toggleComponentVisibility(index)}>
                {hidden ? 'Mostrar' : 'Ocultar'}
              </button>
            </div>
          ))}
        </div>
        <button className="btn-componentes" onClick={toggleAllComponents}>
          {hiddenComponents.every(hidden => hidden) ? 'Mostrar todos los elementos' : 'Ocultar todos los elementos'}
        </button>
      </section>
    </ThemeProvider>
  );
}

export default Componentes;