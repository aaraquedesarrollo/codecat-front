import { useCallback, useEffect } from "react";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { HeaderEjercicio } from "../components/ejercicios/HeaderEjercicio";
import { ListaSinOrdenar } from "../components/ejercicios/ListaSinOrdenar";
import { CabeceraCodecat } from "../components/CabeceraCodecat";
import { GeneralContext } from "../context/GeneralContext";

export const Tarea = () => {
  const { idTrabajo, index } = useParams();
  const { urlApi } = useContext(GeneralContext);

  // const [index, setIndex] = useState(0);
  const history = useHistory();
  const [ejercicios, setEjercicios] = useState();
  const [datosEjercicio, setDatosEjercicio] = useState("");
  const obtenerEjercicios = useCallback(async () => {
    const response = await fetch(
      urlApi + "trabajos/obtener-trabajo/" + idTrabajo,
      {}
    );
    const ejerciciosApi = await response.json();
    setEjercicios(ejerciciosApi);
    setDatosEjercicio(ejerciciosApi.tareas[index]);
  }, [idTrabajo, index, urlApi]);

  useEffect(() => {
    obtenerEjercicios();
  }, [obtenerEjercicios]);
  const paginaAnterior = () => {
    if (+index === 0) {
      history.push(
        "/codecat/ejercicios/" + idTrabajo + "/" + ejercicios.tareas.length - 1
      );
      return;
    }
    history.push(`/codecat/ejercicios/${idTrabajo}/${+index - 1}`);
  };

  const paginaSiguiente = () => {
    if (+index === ejercicios.tareas.length - 1) {
      history.push("/codecat/ejercicios/" + idTrabajo + "/" + 0);
      return;
    }
    history.push(`/codecat/ejercicios/${idTrabajo}/${+index + 1}`);
  };

  return (
    <div className="contenedor-body container-fluid">
      <CabeceraCodecat />
      <div className="container">
        <main className="codecat-principal row justify-content-center">
          <a
            href="/codecat"
            className="enlace-volver col-1 btn btn-info align-self-start"
          >
            Volver
          </a>
          <div className="monitor">
            <Row className="contenido-ejercicio">
              <Col onClick={paginaAnterior} xs="2" className="text-center">
                {"<"}
              </Col>
              <Col xs="8" className="text-center">
                {datosEjercicio.nombre}
              </Col>
              <Col onClick={paginaSiguiente} xs="2" className="text-center">
                {">"}
              </Col>
              {datosEjercicio.nombre === "Header" && (
                <HeaderEjercicio
                  datosEjercicio={datosEjercicio}
                  idTrabajo={idTrabajo}
                />
              )}
              {datosEjercicio.nombre === "Lista sin ordenar" && (
                <ListaSinOrdenar
                  datosEjercicio={datosEjercicio}
                  idTrabajo={idTrabajo}
                />
              )}
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};
