import { useState } from "react";
import { EjerciciosContext } from "./EjerciciosContext";

export const EjerciciosContextProvider = (props) => {
  const { children } = props;

  const [datosFormaciones, setDatosFormaciones] = useState([]);
  const [listaTrabajos, setListaTrabajos] = useState([]);
  const [historialUsuario, setHistorialUsuario] = useState([]);
  return (
    <EjerciciosContext.Provider
      value={{
        datosFormaciones,
        setDatosFormaciones,
        listaTrabajos,
        setListaTrabajos,
        historialUsuario,
        setHistorialUsuario,
      }}
    >
      {children}
    </EjerciciosContext.Provider>
  );
};
