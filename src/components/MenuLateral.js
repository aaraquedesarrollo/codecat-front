import { PropTypes } from "prop-types";
import { useContext } from "react";
import { ProgressBar } from "react-bootstrap";
import { GeneralContext } from "../context/GeneralContext";

export const MenuLateral = (props) => {
  const { toggleAbrirFormaciones, toggleAbrirTrabajos, abrirPopUpGato } = props;
  const { datosUsuario } = useContext(GeneralContext);

  return (
    <section className="seccion-menu col-3">
      {datosUsuario.length !== 0 && (
        <>
          <div className="menu">
            <div className="info-cat">
              <ul className="lista-info list-unstyled">
                <li>Dueño:</li>
                <li>Gato:</li>
                <li>Chuches:</li>
                <li>Nivel:</li>
                <li>Posición:</li>
              </ul>
              <ul className="lista-info list-unstyled">
                <li> {datosUsuario.usuario.username}</li>
                <li>
                  {datosUsuario.usuario.gato
                    ? datosUsuario.usuario.gato
                    : "\u200C"}
                </li>
                <li>
                  {datosUsuario.usuario.chuches
                    ? datosUsuario.usuario.chuches
                    : 0}
                </li>
                <li>{datosUsuario.nivelUsuario.nivel}</li>
                <li> {datosUsuario.nivelUsuario.titulo}</li>
              </ul>
            </div>
            <div className="botones-menu col">
              <div className="text-light">
                Experiencia: {datosUsuario.usuario.experiencia}
              </div>
              <ProgressBar
                className="progress p-0 mb-3"
                striped
                animated
                variant="info"
                label={
                  isNaN(
                    Math.floor(
                      ((datosUsuario.usuario.experiencia -
                        datosUsuario.nivelUsuario.experiencia) *
                        100) /
                        (datosUsuario.siguienteNivel.experiencia -
                          datosUsuario.nivelUsuario.experiencia)
                    )
                  )
                    ? ""
                    : Math.floor(
                        ((datosUsuario.usuario.experiencia -
                          datosUsuario.nivelUsuario.experiencia) *
                          100) /
                          (datosUsuario.siguienteNivel.experiencia -
                            datosUsuario.nivelUsuario.experiencia)
                      ) + "%"
                }
                now={
                  datosUsuario.siguienteNivel.experiencia !== "Max"
                    ? datosUsuario.usuario.experiencia
                    : 100
                }
                min={datosUsuario.nivelUsuario.experiencia}
                max={
                  datosUsuario.siguienteNivel.experiencia !== "Max"
                    ? datosUsuario.siguienteNivel.experiencia
                    : 100
                }
              />
              <button
                className="boton-menu btn btn-light mb-3"
                type="button"
                onClick={toggleAbrirFormaciones}
                disabled={abrirPopUpGato}
              >
                Formación
              </button>
              <button
                className="boton-menu btn btn-light mb-3"
                type="button"
                onClick={toggleAbrirTrabajos}
                disabled={abrirPopUpGato}
              >
                Trabajos
              </button>
              <button className="boton-menu btn btn-light mb-3" type="button">
                Tienda
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

MenuLateral.propTypes = {
  toggleAbrirFormaciones: PropTypes.func.isRequired,
  toggleAbrirTrabajos: PropTypes.func.isRequired,
};
