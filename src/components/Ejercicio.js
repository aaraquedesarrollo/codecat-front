import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FcLock } from "react-icons/fc";
import { GeneralContext } from "../context/GeneralContext";
import { EjerciciosContext } from "../context/EjerciciosContext";
import { FaCheck } from "react-icons/fa";

import { useEffect } from "react";
import { useState } from "react";

export const Ejercicio = (props) => {
  const { ejercicio } = props;
  const { datosUsuario } = useContext(GeneralContext);
  const { historialUsuario } = useContext(EjerciciosContext);
  const [trabajoHistorial, setTrabajoHistorial] = useState([]);
  const history = useHistory();

  const irEjercicios = async (id) => {
    if (datosUsuario.nivelUsuario.nivel < ejercicio.nivel_minimo) {
      return;
    } else if (trabajoHistorial) {
      if (trabajoHistorial.trabajoCompletado) {
        return;
      }
    }
    history.push(`codecat/ejercicios/${ejercicio.tareas[0].tipo}/${id}/0`);
  };
  useEffect(() => {
    setTrabajoHistorial(
      historialUsuario.trabajos.find(
        (trabajo) => trabajo.idTrabajo === ejercicio._id
      )
    );
  }, [ejercicio, ejercicio._id, historialUsuario.trabajos, trabajoHistorial]);
  console.log(trabajoHistorial);
  return (
    <>
      <li
        className="elemento-ejercicios col-3"
        onClick={() => irEjercicios(ejercicio._id)}
      >
        <div className="ejercicio">
          <ul className="list-unstyled">
            <li style={{ fontWeight: "bold" }}>{ejercicio.nombre}</li>
            <li>Tema: {ejercicio.categoria}</li>
            <li>Nivel Requerido: {ejercicio.nivel_minimo}</li>
          </ul>
          {datosUsuario.nivelUsuario.nivel < ejercicio.nivel_minimo && (
            <div className="bloqueado">
              <FcLock />
            </div>
          )}
          {trabajoHistorial?.trabajoCompletado && (
            <div className="completado">
              <FaCheck />
            </div>
          )}
        </div>
      </li>
    </>
  );
};
