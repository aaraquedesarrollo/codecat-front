import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { EjerciciosContext } from "../context/EjerciciosContext";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";
import { Ejercicio } from "./Ejercicio";

export const Habitacion = (props) => {
  const { abrirFormaciones, abrirTrabajos, abrirPopUpGato, setAbrirPopUpGato } =
    props;
  const { token } = useContext(AuthContext);
  const { datosUsuario, urlApi, setDatosUsuario } = useContext(GeneralContext);
  const { datosFormaciones, listaTrabajos } = useContext(EjerciciosContext);
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
      cargarInformacionUsuario();
    } catch (err) {
      setError(err.mensaje);
    }
  };

  const cargarInformacionUsuario = async () => {
    const resp = await fetch(`${urlApi}usuarios/informacion-usuario`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const resultado = await resp.json();
    setDatosUsuario({ ...datosUsuario, usuario: resultado });
  };

  useEffect(() => {
    if (datosUsuario.length !== 0) {
      if (!datosUsuario.usuario?.gato) {
        setAbrirPopUpGato(true);
      }
    }
  }, [datosUsuario.length, datosUsuario.usuario?.gato, setAbrirPopUpGato]);

  return (
    <section className="col-8">
      <div className={`${abrirPopUpGato ? "" : "habitacion "} h-100`}>
        {abrirFormaciones && (
          <section className="ventana-ejercicios col-12">
            <ul className="listado-ejercicios list-unstyled row">
              {datosFormaciones.map((ejercicio) => (
                <Ejercicio key={ejercicio._id} ejercicio={ejercicio} />
              ))}
            </ul>
          </section>
        )}
        {abrirTrabajos && (
          <section className="ventana-ejercicios col-12">
            <ul className="listado-ejercicios list-unstyled row">
              {listaTrabajos.map((ejercicio) => (
                <Ejercicio key={ejercicio._id} ejercicio={ejercicio} />
              ))}
            </ul>
          </section>
        )}
        {abrirPopUpGato && (
          <>
            <div className="justify-content-between row p-5">
              <div className="col-7 position-relative">
                <img
                  src="img\locutormisterioso.png"
                  alt="locutor misterioso position-relative sujetando un café"
                  className="locutor"
                />
              </div>
              <div className="col-3 position-relative align-self-end text-center nombre-prof">
                Prof. Flama
              </div>
              <div className="ventana-ejercicios justify-content-center formulario-nombre-gato col-12">
                <form noValidate={true} onSubmit={submitNombreGato}>
                  <div
                    htmlFor="nombre-gato"
                    className="nombre-gato text-center  align-self-start"
                  >
                    Ei! Primero ponle un nombre a tu compañero felino!
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <input
                      type="text"
                      id="nombre-gato"
                      className="form-control mt-4 w-50"
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
          </>
        )}
      </div>
    </section>
  );
};

Habitacion.propTypes = {
  abrirFormaciones: PropTypes.bool.isRequired,
  abrirTrabajos: PropTypes.bool.isRequired,
  abrirPopUpGato: PropTypes.bool.isRequired,
  setAbrirPopUpGato: PropTypes.func.isRequired,
};
