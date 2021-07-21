import { CabeceraCodecat } from "../components/CodeCat/CabeceraCodecat";
import { MainCodeCat } from "../components/CodeCat/MainCodeCat";

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
