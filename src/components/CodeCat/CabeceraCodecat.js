import { NavLink } from "react-router-dom";

export const CabeceraCodecat = () => {
  return (
    <header className="cabecera row">
      <nav className="navegador col-12 py-3">
        <div className="container">
          <div className="row">
            <h1 className="titulo col-4 text-center">CodeCat</h1>
            <ul className="listado-navegacion col-8 list-unstyled d-flex justify-content-around align-items-center">
              <li>
                <NavLink to="/principal">Principal</NavLink>
              </li>
              <li>
                <NavLink to="/principal">
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
