export const Cabecera = () => {
  return (
    <header className="row fixed-top">
      <nav className="navegador col-12 py-3">
        <div className="container">
          <ul className="listado-navegacion list-unstyled row justify-content-around">
            <li>
              <a href="#principal">Principal</a>
            </li>
            <li>
              <a href="#about">Sobre CodeCat</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
