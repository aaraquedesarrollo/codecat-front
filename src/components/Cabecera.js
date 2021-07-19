export const Cabecera = () => {
  return (
    <header className="row">
      <nav className="navegador col-12 py-3">
        <ul className="listado-navegacion list-unstyled row justify-content-around">
          <li>
            <a href="#principal">Principal</a>
          </li>
          <li>
            <a href="#about">Sobre CodeCat</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
