import { useContext } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GeneralContext } from "../../context/GeneralContext";

export const Ejercicio = (props) => {
  const { ejercicio } = props;
  const { token } = useContext(AuthContext);
  const { urlApi } = useContext(GeneralContext);

  const history = useHistory();

  const anyadirTrabajoHistorial = useCallback(
    async (idTrabajo) => {
      const response = await fetch(
        urlApi + "historial/anyadir-trabajo/" + idTrabajo,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await response.json();
    },
    [token, urlApi]
  );

  const irEjercicios = async (id) => {
    history.push("codecat/ejercicios/" + id);
    await anyadirTrabajoHistorial(id);
  };
  return (
    <>
      <li
        className="elemento-ejercicios col-3"
        onClick={() => irEjercicios(ejercicio._id)}
      >
        <div className="ejercicio">
          <ul className="list-unstyled">
            <li>Formación: {ejercicio.nombre}</li>
            <li>Tema: HTML</li>
            <li>Nivel Requerido: {ejercicio.formacion_minima}</li>
          </ul>
        </div>
      </li>
    </>
  );
};
