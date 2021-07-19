import { PropTypes } from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const FormularioRegistro = (props) => {
  const { toggleRegistrando } = props;
  const { urlApi, setCargando } = useContext(AuthContext);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [verificar, setVerificar] = useState(false);
  const [error, setError] = useState("");

  const [datos, setDatos] = useState({});
  const agregarDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value,
    });
  };
  const comprobarContrasenya = (e) => {
    setRepeatPassword(e.target.value);
  };
  const registrarse = async (e) => {
    e.preventDefault();
    setCargando(true);
    if (
      repeatPassword === datos.password &&
      repeatPassword !== "" &&
      datos.password !== ""
    ) {
      try {
        const response = await fetch(urlApi + "usuarios/registro", {
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
        setError("");
        setCargando(false);
        setVerificar(true);
      } catch (e) {
        setCargando(false);
        setError("Ha habido un error, " + e.mensaje);
      }
    } else if (repeatPassword !== datos.password && repeatPassword !== "") {
      setError("Las contraseñas no coinciden");
      setCargando(false);
    } else if (repeatPassword === "" || datos.password === "") {
      setError("Falta repetir contraseña");
      setCargando(false);
    }
  };

  return (
    <>
      <form className="registro-form col-6 py-3" onSubmit={registrarse}>
        {!verificar && (
          <>
            <h3>Registro</h3>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                className="form-control"
                type="text"
                onChange={agregarDatos}
                placeholder="Escriba aquí su nombre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                id="username"
                className="form-control"
                type="text"
                onChange={agregarDatos}
                placeholder="Escriba aquí su nombre de usuario"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-control"
                type="email"
                onChange={agregarDatos}
                placeholder="example@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                className="form-control"
                type="password"
                onChange={agregarDatos}
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmar-password">Confirmar contraseña</label>
              <input
                id="confirmar-password"
                className="form-control"
                type="password"
                onChange={comprobarContrasenya}
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
          </>
        )}
        {verificar &&
          "Verifica tu cuenta accediendo al correo que te ha llegado al email"}
        {error !== "" && error}
      </form>
    </>
  );
};

FormularioRegistro.propTypes = {
  toggleRegistrando: PropTypes.func.isRequired,
};
