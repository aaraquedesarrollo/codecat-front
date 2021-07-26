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
                <li className="dato-info">
                  <span className="span-info">Dueño:</span>
                  <span className="span-info">
                    {datosUsuario.usuario.username}
                  </span>
                </li>
                <li className="dato-info">
                  <span className="span-info">Gato:</span>
                  <span className="span-info">
                    {datosUsuario.usuario.gato
                      ? datosUsuario.usuario.gato
                      : "\u200C"}
                  </span>
                </li>
                <li className="dato-info">
                  <span className="span-info">Chuches:</span>
                  <span className="span-info">
                    {datosUsuario.usuario.chuches
                      ? datosUsuario.usuario.chuches
                      : 0}
                  </span>
                </li>
                <li className="dato-info">
                  <span className="span-info">Nivel:</span>
                  <span className="span-info">
                    {datosUsuario.nivelUsuario.nivel}
                  </span>
                </li>
                <li className="dato-info">
                  <span className="span-info">Posición:</span>
                  <span className="span-info">
                    {datosUsuario.nivelUsuario.titulo}
                  </span>
                </li>
              </ul>
            </div>
            <div className="botones-menu col">
              <div className="experiencia text-dark text-center">
                Experiencia: {datosUsuario.usuario.experiencia}
              </div>
              <ProgressBar
                className="barra-progreso progress p-0"
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
                className="boton-menu boton-formacion btn btn-light"
                type="button"
                onClick={toggleAbrirFormaciones}
                disabled={abrirPopUpGato}
              >
                Formación
              </button>
              <button
                className="boton-menu boton-trabajo btn btn-light"
                type="button"
                onClick={toggleAbrirTrabajos}
                disabled={abrirPopUpGato}
              >
                Trabajos
              </button>
              <button
                className="boton-menu boton-tienda btn btn-light"
                type="button"
                disabled
              >
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
