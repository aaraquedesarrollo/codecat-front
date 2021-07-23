import { CabeceraCodecat } from "../components/CabeceraCodecat";
import { MainCodeCat } from "../components/MainCodeCat";

export const CodeCat = () => {
  return (
    <>
      <div className="contenedor-body container-fluid">
        <CabeceraCodecat />
        <div className="container">
          <MainCodeCat />
        </div>
      </div>
    </>
  );
};
