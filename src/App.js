function App() {
  return (
    <>
      <header>
        <ul>
          <li>
            <a href="principal">Principal</a>
          </li>
          <li>
            <a href="about">Sobre CodeCat</a>
          </li>
        </ul>
      </header>
      <main>
        <img src="src" alt="Dibujo de un gato en píxel art" />
        <img src="src" alt="Logo de CodeCat" />
        <button type="button">Login</button>
        <button type="button">Registro</button>
        <section>
          <form>
            <h3>Login</h3>
            <label htmlFor="usuario-login">Nombre de Usuario o Email</label>
            <input type="text" placeholder="Nombre de Usuario o Email" />
            <label htmlFor="contrasenya-login">Contraseña</label>
            <input type="password" placeholder="Contraseña" />
          </form>
          <form>
            <h3>Registro</h3>
            <label htmlFor="usuario-registro">Nombre</label>
            <input type="text" placeholder="Escriba aquí su nombre" />
            <label htmlFor="usuario-registro">Nombre de Usuario</label>
            <input
              type="text"
              placeholder="Escriba aquí su nombre de usuario"
            />
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="example@email.com" />
            <label htmlFor="contrasenya-registro">Contraseña</label>
            <input type="password" placeholder="Contraseña" />
            <label htmlFor="confirmar-contrasenya">Confirmar contraseña</label>
            <input type="password" placeholder="Contraseña" />
          </form>
        </section>
      </main>
      <aside>
        <article>
          <h2>Sobre CodeCat</h2>
          <p>
            CodeCat es un proyecto que nace de la idea de 4 jóvenes en el
            proyecto final de un bootcamp de programación.
          </p>
          <p>
            <b>Jose</b> Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Culpa pariatur, veniam nisi libero nihil modi debitis nemo vel
            consequuntur, quas ad. Cum quasi repellendus possimus ipsum, rerum
            dolorum id. Praesentium!
          </p>
          <p>
            <b>Albert</b> Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Culpa pariatur, veniam nisi libero nihil modi debitis nemo vel
            consequuntur, quas ad. Cum quasi repellendus possimus ipsum, rerum
            dolorum id. Praesentium!
          </p>
          <p>
            <b>Sandra</b> Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Culpa pariatur, veniam nisi libero nihil modi debitis nemo vel
            consequuntur, quas ad. Cum quasi repellendus possimus ipsum, rerum
            dolorum id. Praesentium!
          </p>
          <p>
            <b>Raúl</b> Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Culpa pariatur, veniam nisi libero nihil modi debitis nemo vel
            consequuntur, quas ad. Cum quasi repellendus possimus ipsum, rerum
            dolorum id. Praesentium!
          </p>
          <p></p>
        </article>
      </aside>
      <footer>CodeCat &copy; Texto del footer</footer>
    </>
  );
}

export default App;
