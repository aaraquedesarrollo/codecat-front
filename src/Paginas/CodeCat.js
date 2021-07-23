import { CabeceraCodecat } from "../components/CabeceraCodecat";
import { MainCodeCat } from "../components/MainCodeCat";

export const CodeCat = (props) => {
  const { toggleAbrirEjercicios, abrirEjercicios, setAbrirEjercicios } = props;
  return (
    <>
      <div className="contenedor-body container-fluid">
        <CabeceraCodecat />
        <div className="container">
          <MainCodeCat
            toggleAbrirEjercicios={toggleAbrirEjercicios}
            abrirEjercicios={abrirEjercicios}
            setAbrirEjercicios={setAbrirEjercicios}
          />
        </div>
      </div>
    </>
  );
};
