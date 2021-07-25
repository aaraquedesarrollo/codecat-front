import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FcLock } from "react-icons/fc";
import { GeneralContext } from "../context/GeneralContext";

export const Ejercicio = (props) => {
  const { ejercicio } = props;
  const { datosUsuario } = useContext(GeneralContext);

  const history = useHistory();

  const irEjercicios = async (id) => {
    if (datosUsuario.nivelUsuario.nivel < ejercicio.nivel_minimo) {
      return;
    }
    history.push(`codecat/ejercicios/${ejercicio.tipo}/${id}/0`);
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
            <li>Tema: {ejercicio.categoria}</li>
            <li>Nivel Requerido: {ejercicio.nivel_minimo}</li>
          </ul>
          {datosUsuario.nivelUsuario.nivel < ejercicio.nivel_minimo && (
            <div className="bloqueado">
              <FcLock />
            </div>
          )}
        </div>
      </li>
    </>
  );
};
