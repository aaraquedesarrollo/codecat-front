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
        <ul className="list-unstyled text-center">
          <li className="persona-listado">
            <li>Albert Araque</li>
            <li>
              Email:{" "}
              <a href="mailto: aaraquedesarrollo@gmail.com">
                aaraquedesarrollo@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/albert-araque-casaus/">
                LinkedIn
              </a>
            </li>
          </li>
          <li className="persona-listado">
            <li>Sandra Cuéllar</li>
            <li>
              Email:{" "}
              <a href="mailto: sandra.cllp.22@gmail.com">
                sandra.cllp.22@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sandracuellar/">LinkedIn</a>
            </li>
          </li>
          <li className="persona-listado">
            <li>Raúl Navarro</li>
            <li>
              Email:{" "}
              <a href="mailto: raul.navarro.uribe@gmail.com">
                raul.navarro.uribe@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/raul-navarro-uribe/">
                LinkedIn
              </a>
            </li>
          </li>
          <li className="persona-listado">
            <li>Jose María Zamora</li>
            <li>
              Email: <a href="mailto: jzamora@biada.net">jzamora@biada.net</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jose-maria-zamora/">
                LinkedIn
              </a>
            </li>
          </li>
        </ul>
      </article>
      <section className="contacto col-12" id="contacto">
        <h2 className="titulo-aside">Contacto</h2>
        <p>
          Si quieres contactar con nosotros con motivo del videojuego, ya sea
          para sugerencias, reportar errores u otros, puedes contactarnos por
          correo:
        </p>
        <span>
          <a href="mailto: codecat.productions@gmail.com">
            codecat.productions@gmail.com
          </a>
        </span>
      </section>
    </aside>
  );
};
