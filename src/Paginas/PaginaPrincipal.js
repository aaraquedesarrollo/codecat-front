import { useState } from "react";
import { About } from "../components/About";
import { Cabecera } from "../components/Cabecera";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";

export const PaginaPrincipal = () => {
  const [logeando, setLogeando] = useState(false);
  const [registrando, setRegistrando] = useState(false);

  const toggleLogeando = () => {
    setLogeando(!logeando);
    if (registrando) {
      setRegistrando(false);
    }
  };
  const toggleRegistrando = () => {
    setRegistrando(!registrando);
    if (logeando) {
      setLogeando(false);
    }
  };

  return (
    <>
      <div className="contenedor-body container-fluid">
        <Cabecera />
        <div className="contenido-total container">
          <Main
            logeando={logeando}
            registrando={registrando}
            toggleLogeando={toggleLogeando}
            toggleRegistrando={toggleRegistrando}
          />
          <About />
        </div>
        <Footer />
      </div>
    </>
  );
};
