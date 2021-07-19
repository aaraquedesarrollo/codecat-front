import { PropTypes } from "prop-types";

export const Formularios = (props) => {
  const { logeando, registrando, toggleLogeando, toggleRegistrando } = props;
  return (
    <>
      <form className={`login-form col-6 py-3 ${logeando ? "" : "d-none"}`}>
        <h3>Login</h3>
        <div className="form-group">
          <label htmlFor="usuario-login">Nombre de Usuario o Email</label>
          <input
            className="form-control"
            type="text"
            placeholder="Nombre de Usuario o Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasenya-login">Contraseña</label>
          <input
            className="form-control"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={toggleLogeando}
        >
          Cancelar
        </button>
      </form>
      <form
        className={`registro-form col-6 py-3 ${registrando ? "" : "d-none"}`}
      >
        <h3>Registro</h3>
        <div className="form-group">
          <label htmlFor="usuario-registro">Nombre</label>
          <input
            className="form-control"
            type="text"
            placeholder="Escriba aquí su nombre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="usuario-registro">Nombre de Usuario</label>
          <input
            className="form-control"
            type="text"
            placeholder="Escriba aquí su nombre de usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="example@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasenya-registro">Contraseña</label>
          <input
            className="form-control"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmar-contrasenya">Confirmar contraseña</label>
          <input
            className="form-control"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={toggleRegistrando}
        >
          Cancelar
        </button>
      </form>
    </>
  );
};

Formularios.propTypes = {
  logeando: PropTypes.bool.isRequired,
  registrando: PropTypes.bool.isRequired,
  toggleLogeando: PropTypes.func.isRequired,
  toggleRegistrando: PropTypes.func.isRequired,
};
