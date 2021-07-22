import { useState } from "react";
import { Habitacion } from "./Habitacion";
import { MenuLateral } from "./MenuLateral";

export const MainCodeCat = () => {
  const [abrirEjercicios, setAbrirEjercicios] = useState(false);
  const toggleAbrirEjercicios = () => {
    setAbrirEjercicios(!abrirEjercicios);
  };
  return (
    <>
      <main className="codecat-principal row">
        <MenuLateral toggleAbrirEjercicios={toggleAbrirEjercicios} />
        <Habitacion abrirEjercicios={abrirEjercicios} />
      </main>
    </>
  );
};
