import { PropTypes } from "prop-types";
import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { EjerciciosContext } from "../../context/EjerciciosContext";
import { GeneralContext } from "../../context/GeneralContext";

export const MenuLateral = (props) => {
  const { toggleAbrirEjercicios } = props;
  const { token } = useContext(AuthContext);
  const { urlApi, datosUsuario, setDatosUsuario } = useContext(GeneralContext);
  const { setDatosFormaciones } = useContext(EjerciciosContext);
  const obtenerDatosUsuario = useCallback(async () => {
    try {
      const response = await fetch(urlApi + "codecat/cargar-informacion", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const usuario = await response.json();
      setDatosUsuario(usuario);
      setDatosFormaciones([...usuario.listadoFormaciones]);
    } catch (error) {
      console.log(error);
    }
  }, [setDatosFormaciones, setDatosUsuario, token, urlApi]);
  useEffect(() => obtenerDatosUsuario(), [obtenerDatosUsuario]);

  return (
    <section className="seccion-menu col-3">
      {datosUsuario.length !== 0 && (
        <>
          <div className="menu">
            <div className="info-cat">
              <ul className="lista-info list-unstyled">
                <li>Nombre:</li>
                <li>Nivel:</li>
                <li>Posición:</li>
                <li>Galletitas:</li>
              </ul>
              <ul className="lista-info list-unstyled">
                <li> {datosUsuario.usuario.username}</li>
                <li>{datosUsuario.nivelUsuario.nivel}</li>
                <li> {datosUsuario.nivelUsuario.titulo}</li>
                <li>
                  {datosUsuario.usuario.galletas
                    ? datosUsuario.usuario.galletas
                    : 0}
                </li>
              </ul>
            </div>
            <ProgressBar
              className="progress p-0"
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
              className="boton-menu btn btn-light"
              type="button"
              onClick={toggleAbrirEjercicios}
            >
              Formación
            </button>
            <button className="boton-menu btn btn-light" type="button">
              Trabajos
            </button>
            <button className="boton-menu btn btn-light" type="button">
              Tienda
            </button>
          </div>
        </>
      )}
    </section>
  );
};

MenuLateral.propTypes = {
  toggleAbrirEjercicios: PropTypes.func.isRequired,
};
