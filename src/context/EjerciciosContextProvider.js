import { useState } from "react";
import { EjerciciosContext } from "./EjerciciosContext";

export const EjerciciosContextProvider = (props) => {
  const { children } = props;

  const [datosFormaciones, setDatosFormaciones] = useState([]);
  const [listaTrabajos, setListaTrabajos] = useState([]);

  return (
    <EjerciciosContext.Provider
      value={{
        datosFormaciones,
        setDatosFormaciones,
        listaTrabajos,
        setListaTrabajos,
      }}
    >
      {children}
    </EjerciciosContext.Provider>
  );
};
