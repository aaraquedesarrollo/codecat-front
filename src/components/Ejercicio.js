import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FcLock } from "react-icons/fc";
import { GeneralContext } from "../context/GeneralContext";

export const Ejercicio = (props) => {
  const { ejercicio } = props;
  const { datosUsuario } = useContext(GeneralContext);

  const history = useHistory();

  const irEjercicios = async (id) => {
    if (datosUsuario.nivelUsuario.experiencia < ejercicio.formacion_minima) {
      return;
    }
    history.push("codecat/ejercicios/" + id);
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
          {datosUsuario.nivelUsuario.experiencia <
            ejercicio.formacion_minima && (
            <div className="bloqueado">
              <FcLock />
            </div>
          )}
        </div>
      </li>
    </>
  );
};
