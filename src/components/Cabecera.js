export const Cabecera = () => {
  return (
    <header className="cabecera row fixed-top">
      <nav className="navegador col-12 py-3">
        <div className="container">
          <div className="row">
            <h1 className="titulo col-4 text-center">CodeCat</h1>
            <ul className="listado-navegacion col-8 list-unstyled d-flex justify-content-around align-items-center">
              <li>
                <a href="#principal">Principal</a>
              </li>
              <li>
                <a href="#about">Sobre CodeCat</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
