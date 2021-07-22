import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { EjerciciosContext } from "./EjerciciosContext";
import { GeneralContext } from "./GeneralContext";

export const EjerciciosContextProvider = (props) => {
  const { children } = props;
  const { urlApi } = useContext(GeneralContext);
  const { token } = useContext(AuthContext);

  const [datosFormaciones, setDatosFormaciones] = useState([]);
  const conseguirExperiencia = async (experiencia) => {
    await fetch(urlApi + "usuarios/modificar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ $inc: { experiencia } }),
    });
  };
  return (
    <EjerciciosContext.Provider
      value={{ datosFormaciones, setDatosFormaciones, conseguirExperiencia }}
    >
      {children}
    </EjerciciosContext.Provider>
  );
};
