import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const CabeceraCodecat = () => {
  const { desloguearUsuario } = useContext(AuthContext);
  return (
    <header className="cabecera row">
      <nav className="navegador col-12 py-3">
        <div className="container">
          <div className="row">
            <h1 className="titulo col-4 text-center">CodeCat</h1>
            <ul className="listado-navegacion col-8 list-unstyled d-flex justify-content-end align-items-center">
              <li>
                <NavLink to="/principal" onClick={desloguearUsuario}>
                  Huir
                  <img
                    src="/img/emergency-exit.png"
                    alt="Salida de emergencia"
                    height="40"
                  />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
