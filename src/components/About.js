import { FiAtSign } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

export const About = () => {
  return (
    <aside className="contenedor-secundario row p-3">
      <article className="col-12" id="about">
        <h2 className="titulo-aside">Sobre CodeCat</h2>
        <p>
          CodeCat es un proyecto que nace después de descartar varias ideas como
          proyecto final para un Bootcamp de programación.
        </p>
        <p>Está desarrollado por 4 jóvenes con intereses mútuos:</p>
        <ul>
          <li>Videojuegos</li>
          <li>Gatos</li>
          <li>Programación</li>
        </ul>
        <p>
          Por lo tanto, la idea tardaría poco en salir solamente con unir esos 3
          elementos.
        </p>
        <p>
          Tenemos muchas ganas de trabajar y seguir aprendiendo, de modo que si
          te gusta nuestro trabajo y quieres ponerte en contacto con nosotros,
          puedes hacerlo a través de:
        </p>
        <div className="row">
          <div className="col-3">
            <div className="row">
              <span className="col-12 text-center font-weight-bold mb-2">
                Albert Araque
              </span>
              <div className="col-6 text-right">
                <a href="mailto: aaraquedesarrollo@gmail.com">
                  <FiAtSign className="icono"></FiAtSign>
                </a>
              </div>
              <div className="col-6">
                <a href="https://www.linkedin.com/in/albert-araque-casaus/">
                  <FaLinkedin className="icono"></FaLinkedin>
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <span className="col-12 text-center font-weight-bold mb-2">
                Sandra Cuéllar
              </span>
              <div className="col-6 text-right">
                <a href="mailto: sandra.cllp.22@gmail.com">
                  <FiAtSign className="icono"></FiAtSign>
                </a>
              </div>
              <div className="col-6">
                <a href="https://www.linkedin.com/in/sandracuellar/">
                  <FaLinkedin className="icono"></FaLinkedin>
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <span className="col-12 text-center font-weight-bold mb-2">
                Raúl Navarro
              </span>
              <div className="col-6 text-right">
                <a href="mailto: raul.navarro.uribe@gmail.com">
                  <FiAtSign className="icono"></FiAtSign>
                </a>
              </div>
              <div className="col-6">
                <a href="https://www.linkedin.com/in/raul-navarro-uribe/">
                  <FaLinkedin className="icono"></FaLinkedin>
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <span className="col-12 text-center font-weight-bold mb-2">
                Jose María Zamora
              </span>
              <div className="col-6 text-right">
                <a href="mailto: jzamora@biada.net">
                  <FiAtSign className="icono"></FiAtSign>
                </a>
              </div>
              <div className="col-6">
                <a href="https://www.linkedin.com/in/jose-maria-zamora/">
                  <FaLinkedin className="icono"></FaLinkedin>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
      <section className="contacto col-12 d-flex flex-column" id="contacto">
        <h2 className="titulo-aside">Contacto</h2>
        <p>
          Si quieres contactar con nosotros con motivo del videojuego, ya sea
          para sugerencias, reportar errores u otros, puedes contactarnos por
          correo:
        </p>
        <span className="align-self-center">
          <a href="mailto: codecat.productions@gmail.com">
            codecat.productions@gmail.com
          </a>
        </span>
      </section>
    </aside>
  );
};
