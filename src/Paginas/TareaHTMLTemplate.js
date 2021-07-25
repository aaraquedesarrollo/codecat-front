import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { CabeceraCodecat } from "../components/CabeceraCodecat";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";
import { FaCheck } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

export const TareaHTMLTemplate = () => {
  const { idTrabajo, indiceTarea } = useParams();
  const { urlApi } = useContext(GeneralContext);
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const [ejercicioActual, setEjercicioActual] = useState(null);
  const [tareasCompletadas, setTareasCompletadas] = useState(null);
  const [tareaCompletada, setTareaCompletada] = useState(false);
  const [listaInputs, setListaInputs] = useState([]);
  const [error, setError] = useState(false);
  const [acierto, setAcierto] = useState(false);

  const cargarEjericicio = useCallback(async () => {
    const resp = await fetch(urlApi + "trabajos/obtener-trabajo/" + idTrabajo);
    const resultado = await resp.json();
    setEjercicioActual(resultado);
  }, [idTrabajo, urlApi]);

  const cargarTareasCompletadas = useCallback(async () => {
    const resp = await fetch(
      urlApi + "historial/obtener-historial/trabajo/" + idTrabajo,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const resultado = await resp.json();
    setTareasCompletadas(resultado);
  }, [idTrabajo, token, urlApi]);

  const paginaAnterior = () => {
    if (+indiceTarea === 0) {
      history.push(
        `/codecat/ejercicios/${ejercicioActual.tipo}/${idTrabajo}/${
          ejercicioActual.tareas.length - 1
        }`
      );
      return;
    }
    history.push(
      `/codecat/ejercicios/${ejercicioActual.tipo}/${idTrabajo}/${
        +indiceTarea - 1
      }`
    );
  };

  const paginaSiguiente = () => {
    if (+indiceTarea === ejercicioActual.tareas.length - 1) {
      history.push(
        `/codecat/ejercicios/${ejercicioActual.tipo}/${idTrabajo}/${0}`
      );
      return;
    }
    history.push(
      `/codecat/ejercicios/${ejercicioActual.tipo}/${idTrabajo}/${
        +indiceTarea + 1
      }`
    );
  };

  const changeInput = (e, indice) => {
    setListaInputs(
      listaInputs.map((input, indiceLista) => {
        if (indice === indiceLista) {
          return e.target.value;
        }
        return input;
      })
    );
  };

  const listarObjetivosOrdenados = (
    padreInput,
    indiceEtiqueta = 0,
    posicionHtml = 0
  ) => {
    if (ejercicioActual) {
      if (typeof listaInputs !== "undefined" && listaInputs.length !== 0)
        return (
          <>
            <Col
              xs="8"
              className={`input-ejercicio offset-${posicionHtml}`}
              key={padreInput.etiqueta + "-abertura-" + indiceEtiqueta}
            >
              <span>{"<"}</span>
              <input
                type="text"
                value={listaInputs[indiceEtiqueta]}
                onChange={(e) => changeInput(e, indiceEtiqueta)}
              />
              <span>{" >"}</span>
            </Col>
            {padreInput.children &&
              padreInput.children.map((children, indiceMap) =>
                listarObjetivosOrdenados(
                  children,
                  indiceEtiqueta + (indiceMap + 1),
                  posicionHtml + 1
                )
              )}
            <Col
              xs="8"
              className={`input-ejercicio offset-${posicionHtml} etiqueta-cierre`}
              key={padreInput.etiqueta + "-cierre-" + indiceEtiqueta}
            >
              <span>{"<"} </span>
              <input
                type="text"
                readOnly
                value={"/" + listaInputs[indiceEtiqueta]}
              />
              <span>{" >"}</span>
            </Col>
          </>
        );
    }
  };

  const cargarListaInputs = useCallback((iterando = [], contador = 0) => {
    contador = contador + 1;
    if (iterando.children) {
      for (const padre of iterando.children) {
        contador = cargarListaInputs(padre, contador++);
      }
    }
    return contador;
  }, []);

  const comprobarRespuesta = (padre, indice = 0) => {
    try {
      let respuestas;
      if (padre.children) {
        respuestas = padre.children.map((padreMap, indiceMap) =>
          comprobarRespuesta(padreMap, indice + (indiceMap + 1))
        );
        if (respuestas.includes(false)) throw new Error();
      }
    } catch (err) {
      throw new Error();
    }
    if (padre.etiqueta === listaInputs[indice]) return true;

    throw new Error();
  };

  const setRespuesta = async (padre) => {
    try {
      comprobarRespuesta(padre);
      setError(false);
      setAcierto(true);
      await fetch(
        `${urlApi}historial/anyadir-tarea/${idTrabajo}/${ejercicioActual.tareas[indiceTarea]._id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
      cargarTareasCompletadas();
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    cargarEjericicio();
    cargarTareasCompletadas();
  }, [cargarEjericicio, cargarTareasCompletadas]);

  useEffect(() => {
    setListaInputs(
      new Array(
        cargarListaInputs(ejercicioActual?.tareas[indiceTarea].objetivos)
      ).fill("")
    );
  }, [cargarListaInputs, ejercicioActual?.tareas, indiceTarea]);

  useEffect(() => {
    if (tareasCompletadas && ejercicioActual) {
      if (tareasCompletadas.includes(ejercicioActual.tareas[indiceTarea]._id)) {
        setTareaCompletada(true);
      } else {
        setTareaCompletada(false);
      }
    }
  }, [ejercicioActual, indiceTarea, tareasCompletadas]);

  return (
    <div className="contenedor-body container-fluid">
      {ejercicioActual && (
        <>
          <CabeceraCodecat />
          <div className="container">
            <main className="codecat-principal contenedor-monitor row align-content-center flex-column">
              <div className="text-center">
                <a
                  href="/codecat"
                  className="boton-principal boton-monitor btn btn-info align-self-start"
                >
                  Volver
                </a>
              </div>
              <div className="monitor">
                <Row className="contenido-ejercicio">
                  <Col xs="2" className="text-center">
                    {+indiceTarea !== 0 && (
                      <span className="boton-tarea" onClick={paginaAnterior}>
                        {"<"}
                      </span>
                    )}
                  </Col>
                  <Col xs="8" className="text-center">
                    {ejercicioActual?.tareas[indiceTarea].nombre}
                  </Col>
                  <Col xs="2" className="text-center">
                    {+indiceTarea !== ejercicioActual.tareas.length - 1 && (
                      <span className="boton-tarea" onClick={paginaSiguiente}>
                        {">"}
                      </span>
                    )}
                  </Col>
                  <Col as="h2" xs="12" className="enunciado text-center">
                    {ejercicioActual &&
                      ejercicioActual?.tareas[indiceTarea].descripcion}
                  </Col>
                  {tareaCompletada ? (
                    <Col xs="12" className="text-center">
                      <img
                        src="/img/codecat-imagen.png"
                        alt="Dibujo de un gato en píxel art"
                        width="172"
                        height="212"
                      />
                      <div>
                        <p>¡Tarea completada!</p>
                      </div>
                    </Col>
                  ) : (
                    listarObjetivosOrdenados(
                      ejercicioActual.tareas[indiceTarea].objetivos
                    )
                  )}
                  {!tareaCompletada && (
                    <div className="col-12 text-center">
                      <Button
                        className="comprobar-ejercicio"
                        onClick={() =>
                          setRespuesta(
                            ejercicioActual.tareas[indiceTarea].objetivos
                          )
                        }
                      >
                        Comprobar
                      </Button>
                      {acierto && (
                        <FaCheck className="icono-tarea ml-3"></FaCheck>
                      )}
                      {error && (
                        <FaRegTimesCircle className="icono-tarea icono-error ml-3" />
                      )}
                    </div>
                  )}
                </Row>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};
