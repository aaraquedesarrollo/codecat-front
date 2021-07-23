import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

export const Loading = () => {
  const { cargando } = useContext(GeneralContext);

  return (
    cargando && (
      <div className="contenedor-loading">
        <div className="loading">
          <div>Loading</div>
          <div className="puntos"></div>
        </div>
      </div>
    )
  );
};
