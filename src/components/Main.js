import { PropTypes } from "prop-types";
import { FormularioLogin } from "./FormularioLogin";
import { FormularioRegistro } from "./FormularioRegistro";

export const Main = (props) => {
  const { logeando, registrando, toggleLogeando, toggleRegistrando } = props;
  return (
    <main
      className="contenido-principal row pb-3 justify-content-center"
      id="principal"
    >
      <div className="col-6 d-flex justify-content-center">
        <img
          src="/img/codecat-imagen.png"
          alt="Dibujo de un gato en píxel art"
          width="345"
          height="425"
        />
      </div>
      <div className="col-6">
        <div className="contenedor-logo row">
          <div className="col-12 d-flex justify-content-center">
            <img
              src="/img/logo-codecat.png"
              alt="Logo de CodeCat"
              width="420"
              height="329"
            />
          </div>
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

      {logeando && <FormularioLogin toggleLogeando={toggleLogeando} />}
      {registrando && (
        <FormularioRegistro toggleRegistrando={toggleRegistrando} />
      )}
    </main>
  );
};

Main.propTypes = {
  logeando: PropTypes.bool.isRequired,
  registrando: PropTypes.bool.isRequired,
  toggleLogeando: PropTypes.func.isRequired,
  toggleRegistrando: PropTypes.func.isRequired,
};
