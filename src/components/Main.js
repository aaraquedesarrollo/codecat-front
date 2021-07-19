import { PropTypes } from "prop-types";
import { Formularios } from "./Formularios";

export const Main = (props) => {
  const { logeando, registrando, toggleLogeando, toggleRegistrando } = props;
  return (
    <main
      className="contenido-principal row py-3 justify-content-center"
      id="principal"
    >
      <div className="col-6">
        <img
          src="src"
          alt="Dibujo de un gato en píxel art"
          width="400"
          height="500"
        />
      </div>
      <div className="col-6">
        <div className="contenedor-logo row">
          <img
            className="col-12"
            src="src"
            alt="Logo de CodeCat"
            width="400"
            height="400"
          />
          <div className="contenedor-botones col-12 d-flex justify-content-around">
            <button
              className="boton-principal btn btn-secondary"
              type="button"
              onClick={toggleLogeando}
            >
              Login
            </button>
            <button
              className="boton-principal btn btn-secondary"
              type="button"
              onClick={toggleRegistrando}
            >
              Registro
            </button>
          </div>
        </div>
      </div>
      <Formularios
        logeando={logeando}
        registrando={registrando}
        toggleRegistrando={toggleRegistrando}
        toggleLogeando={toggleLogeando}
      />
    </main>
  );
};

Main.propTypes = {
  logeando: PropTypes.bool.isRequired,
  registrando: PropTypes.bool.isRequired,
  toggleLogeando: PropTypes.func.isRequired,
  toggleRegistrando: PropTypes.func.isRequired,
};
