import { Habitacion } from "./Habitacion";
import { MenuLateral } from "./MenuLateral";

export const MainCodeCat = () => {
  return (
    <>
      <main className="codecat-principal row">
        <MenuLateral />
        <Habitacion />
      </main>
    </>
  );
};
