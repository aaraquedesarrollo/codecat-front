import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { EjerciciosContext } from "../context/EjerciciosContext";
import { GeneralContext } from "../context/GeneralContext";
import { Habitacion } from "./Habitacion";
import { MenuLateral } from "./MenuLateral";

export const MainCodeCat = () => {
  const { token, desloguearUsuario } = useContext(AuthContext);
  const { urlApi, setDatosUsuario } = useContext(GeneralContext);
  const [abrirFormaciones, setAbrirFormaciones] = useState(false);
  const [abrirTrabajos, setAbrirTrabajos] = useState(false);
  const [abrirPopUpGato, setAbrirPopUpGato] = useState(false);
  const { setDatosFormaciones, setListaTrabajos } =
    useContext(EjerciciosContext);

  const toggleAbrirFormaciones = () => {
    setAbrirFormaciones(!abrirFormaciones);
    setAbrirTrabajos(false);
  };

  const toggleAbrirTrabajos = () => {
    setAbrirTrabajos(!abrirTrabajos);
    setAbrirFormaciones(false);
  };

  const crearHistorial = useCallback(() => {
    fetch(urlApi + "historial/crear-historial", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }, [token, urlApi]);

  const obtenerDatosUsuario = useCallback(async () => {
    try {
      const response = await fetch(urlApi + "codecat/cargar-informacion", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const datosCodeCat = await response.json();
      if (datosCodeCat.mensaje?.includes("caducado")) {
        desloguearUsuario();
        return;
      }
      const { usuario, siguienteNivel, nivelUsuario } = datosCodeCat;
      setDatosUsuario({ usuario, siguienteNivel, nivelUsuario });
      setDatosFormaciones(datosCodeCat.listadoFormaciones);
      setListaTrabajos(datosCodeCat.listadoTrabajos);
    } catch (error) {
      console.log(error);
    }
  }, [
    desloguearUsuario,
    setDatosFormaciones,
    setDatosUsuario,
    setListaTrabajos,
    token,
    urlApi,
  ]);

  useEffect(() => obtenerDatosUsuario(), [obtenerDatosUsuario]);

  useEffect(() => {
    crearHistorial();
  }, [crearHistorial]);

  return (
    <>
      <main className="codecat-principal row">
        <MenuLateral
          toggleAbrirFormaciones={toggleAbrirFormaciones}
          toggleAbrirTrabajos={toggleAbrirTrabajos}
          abrirPopUpGato={abrirPopUpGato}
        />
        <Habitacion
          abrirFormaciones={abrirFormaciones}
          abrirTrabajos={abrirTrabajos}
          abrirPopUpGato={abrirPopUpGato}
          setAbrirPopUpGato={setAbrirPopUpGato}
        />
      </main>
    </>
  );
};
