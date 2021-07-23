import { useEffect } from "react";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { EjerciciosContext } from "../context/EjerciciosContext";
import { HeaderEjercicio } from "../components/ejercicios/HeaderEjercicio";
import { ListaSinOrdenar } from "../components/ejercicios/ListaSinOrdenar";
import { CabeceraCodecat } from "../components/CabeceraCodecat";

export const Tarea = () => {
  const { idTrabajo } = useParams();
  const { datosFormaciones } = useContext(EjerciciosContext);
  const [index, setIndex] = useState(0);
  const history = useHistory();
  const ejercicios = datosFormaciones.find(
    (formacion) => formacion._id === idTrabajo
  );
  const [datosEjercicio, setDatosEjercicio] = useState("");
  useEffect(() => {
    if (!ejercicios) {
      history.push("/codecat");
    }
  }, [ejercicios, history]);

  const paginaAnterior = () => {
    if (index === 0) {
      setIndex(ejercicios.tareas.length - 1);
      return;
    }
    setIndex(index - 1);
  };

  const paginaSiguiente = () => {
    if (index === ejercicios.tareas.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  };

  useEffect(
    () => setDatosEjercicio(ejercicios.tareas[index]),
    [ejercicios.tareas, index]
  );

  // no devuelve lo que toca
  /*  useEffect(() => {
    return async () => {
      const tareasHistorial = await obtenerTareasCompletadas(idTrabajo);
      if (ejercicios.tareas === tareasHistorial) {
        console.log("si");
      }
    };
  }, [
    datosEjercicio._id,
    ejercicios.tareas,
    idTrabajo,
    obtenerTareasCompletadas,
  ]); */

  return (
    <div className="contenedor-body container-fluid">
      <CabeceraCodecat />
      <div className="container">
        <main className="codecat-principal row justify-content-center">
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
