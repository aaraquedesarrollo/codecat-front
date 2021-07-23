import { useState } from "react";
import { EjerciciosContext } from "./EjerciciosContext";

export const EjerciciosContextProvider = (props) => {
  const { children } = props;

  const [datosFormaciones, setDatosFormaciones] = useState([]);
  const [listaTrabajos, setListaTrabajos] = useState([]);
  //no devuleve lo que toca
  /*  const obtenerTareasCompletadas = async (idTrabajo) => {
    const response = await fetch(
      urlApi + "historial/comprobar-tareas/" + idTrabajo,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const tareasCompletadas = await response.json();
    return tareasCompletadas;
  };
 */
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
