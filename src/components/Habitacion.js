import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { EjerciciosContext } from "../context/EjerciciosContext";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";
import { Ejercicio } from "./Ejercicio";

export const Habitacion = (props) => {
  const { abrirEjercicios } = props;
  const { token } = useContext(AuthContext);
  const { datosUsuario, urlApi } = useContext(GeneralContext);
  const { datosFormaciones } = useContext(EjerciciosContext);
  const [abrirPopUpGato, setAbrirPopUpGato] = useState(false);
  const [inputNombreGato, setInputNombreGato] = useState("");
  const [error, setError] = useState("");

  const submitNombreGato = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        urlApi + "codecat/nombre-gato/" + inputNombreGato,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
      const resultado = await resp.json();
      if (resultado.error) {
        throw resultado;
      }
      setAbrirPopUpGato(false);
    } catch (err) {
      setError(err.mensaje);
    }
  };

  useEffect(() => {
    if (datosUsuario.length !== 0) {
      if (!datosUsuario.usuario?.gato) {
        setAbrirPopUpGato(true);
      }
    }
  }, [datosUsuario.length, datosUsuario.usuario?.gato]);

  return (
    <section className="col-9">
      <div className="habitacion row">
        {abrirEjercicios && (
          <section className="ventana-ejercicios col-12">
            <ul className="listado-ejercicios list-unstyled row">
              {datosFormaciones.map((ejercicio) => (
                <Ejercicio key={ejercicio._id} ejercicio={ejercicio} />
              ))}
            </ul>
          </section>
        )}
        {abrirPopUpGato && (
          <div className="ventana-ejercicios col-12">
            <div className="formulario-nombre-gato">
              <form noValidate={true} onSubmit={submitNombreGato}>
                <div className="form-group">
                  <label htmlFor="nombre-gato">
                    Ponle un nombre a tu compañero felino:{" "}
                  </label>
                  <input
                    type="text"
                    id="nombre-gato"
                    className="form-control"
                    value={inputNombreGato}
                    onChange={(e) => setInputNombreGato(e.target.value)}
                  ></input>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn">
                    ¡Empezar aventura!
                  </button>
                  {error !== "" && (
                    <span className="d-block mt-2">{error}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

Habitacion.propTypes = {
  abrirEjercicios: PropTypes.bool.isRequired,
};