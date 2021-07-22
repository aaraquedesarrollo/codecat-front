import { useState } from "react";
import { EjerciciosContext } from "./EjerciciosContext";

export const EjerciciosContextProvider = (props) => {
  const { children } = props;
  const [datosFormaciones, setDatosFormaciones] = useState([]);

  return (
    <EjerciciosContext.Provider
      value={{ datosFormaciones, setDatosFormaciones }}
    >
      {children}
    </EjerciciosContext.Provider>
  );
};
