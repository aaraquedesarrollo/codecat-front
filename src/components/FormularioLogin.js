import { PropTypes } from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";

export const FormularioLogin = (props) => {
  const { toggleLogeando } = props;
  const { urlApi, setCargando } = useContext(GeneralContext);
  const { loguearUsuario } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [datos, setDatos] = useState({});
  const agregarDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value,
    });
  };

  const loguearse = async () => {
    if (datos.password !== "" && datos.username !== "") {
      try {
        setCargando(true);
        const response = await fetch(urlApi + "usuarios/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
        const respuesta = await response.json();
        if (respuesta.error) {
          throw respuesta;
        }
        setCargando(false);
        setError("");
        loguearUsuario(respuesta.token);
      } catch (e) {
        setCargando(false);
        setError(e.mensaje);
      }
    } else {
      setError("Faltan credenciales para iniciar sesion");
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    loguearse();
  };

  return (
    <>
      <form className="login-form col-6" onSubmit={submitLogin}>
        <h3 className="text-center mb-3">Login</h3>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario o Email</label>
          <input
            className="form-control"
            id="username"
            type="text"
            placeholder="Nombre de Usuario o Email"
            onChange={agregarDatos}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="Contraseña"
            onChange={agregarDatos}
          />
        </div>
        <div className="d-flex justify-content-around">
          <button type="submit" className="boton-formulario btn btn-primary">
            Login
          </button>
          <button
            type="button"
            className="boton-formulario btn btn-secondary"
            onClick={toggleLogeando}
          >
            Cancelar
          </button>
        </div>
        {error !== "" && <p className="mensaje">{error}</p>}
      </form>
    </>
  );
};

FormularioLogin.propTypes = {
  toggleLogeando: PropTypes.func.isRequired,
};
