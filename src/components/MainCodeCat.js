import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";
import { Habitacion } from "./Habitacion";
import { MenuLateral } from "./MenuLateral";

export const MainCodeCat = () => {
  const { urlApi } = useContext(GeneralContext);
  const { token } = useContext(AuthContext);
  const [abrirEjercicios, setAbrirEjercicios] = useState(false);
  const toggleAbrirEjercicios = () => {
    setAbrirEjercicios(!abrirEjercicios);
  };

  // Funcion que comprueba si el usuario tiene historial o no y lo crea en caso de que no exista
  const crearHistorial = () => {
    fetch(urlApi + "historial/crear-historial", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  // AL inciarse el componente se llama a crearHistorial
  useEffect(() => {
    crearHistorial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="codecat-principal row">
        <MenuLateral toggleAbrirEjercicios={toggleAbrirEjercicios} />
        <Habitacion abrirEjercicios={abrirEjercicios} />
      </main>
    </>
  );
};
