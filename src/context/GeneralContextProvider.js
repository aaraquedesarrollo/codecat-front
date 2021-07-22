import { useState } from "react";
import { GeneralContext } from "./GeneralContext";

export const GeneralContextProvider = (props) => {
  const { children } = props;
  const urlApi = process.env.REACT_APP_URL_API;
  const [cargando, setCargando] = useState(false);

  return (
    <GeneralContext.Provider value={{ urlApi, cargando, setCargando }}>
      {children}
    </GeneralContext.Provider>
  );
};
