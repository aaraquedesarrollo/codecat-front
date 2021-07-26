import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { CabeceraCodecat } from "../components/CabeceraCodecat";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";

export const TareaTestTemplate = () => {
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
    history.push(
      `/codecat/ejercicios/${
        ejercicioActual.tareas[+indiceTarea - 1].tipo
      }/${idTrabajo}/${+indiceTarea - 1}`
    );
    setError(false);
    setAcierto(false);
  };

  const paginaSiguiente = () => {
    debugger;
    history.push(
      `/codecat/ejercicios/${
        ejercicioActual.tareas[+indiceTarea + 1].tipo
      }/${idTrabajo}/${+indiceTarea + 1}`
    );
    setError(false);
    setAcierto(false);
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

  const listarInputsTest = () => {
    if (ejercicioActual) {
      if (typeof listaInputs !== "undefined" && listaInputs.length !== 0) {
        return (
          <Col
            xs="12"
            className="input-ejercicio tipo-test justify-content-center"
          >
            <span>{"<"}</span>
            {ejercicioActual.tareas[indiceTarea].etiqueta
              .split("-")
              .map((espacio, indice) => {
                return (
                  <>
                    <select onChange={(e) => changeInput(e, indice)}>
                      {ejercicioActual.tareas[indiceTarea].objetivos[
                        indice
                      ]?.soluciones.map((solucion, indice) => {
                        if (indice === 0) {
                          return (
                            <>
                              <option disabled selected>
                                {""}
                              </option>
                              <option value={solucion}>{solucion}</option>
                            </>
                          );
                        }
                        return <option value={solucion}>{solucion}</option>;
                      })}
                    </select>
                    <span className={espacio === "a" ? "espaciado" : ""}>
                      {espacio}
                    </span>
                  </>
                );
              })}
            <span>{`/>`}</span>
          </Col>
        );
      }
    }
  };

  const comprobarRespuestas = async () => {
    let resultado;
    const soluciones = ejercicioActual.tareas[indiceTarea].objetivos.map(
      (objetivo) => objetivo.solucion
    );
    resultado = listaInputs.map((input, indice) => {
      if (input === soluciones[indice]) {
        return true;
      } else {
        return false;
      }
    });
    if (resultado.includes(false)) {
      setError(true);
      setAcierto(false);
    } else {
      await fetch(
        `${urlApi}historial/anyadir-tarea/${idTrabajo}/${ejercicioActual.tareas[indiceTarea]._id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
      setAcierto(true);
      setError(false);
      cargarTareasCompletadas();
    }
  };

  useEffect(() => {
    cargarEjericicio();
    cargarTareasCompletadas();
  }, [cargarEjericicio, cargarTareasCompletadas]);

  useEffect(() => {
    if (ejercicioActual)
      setListaInputs(
        ejercicioActual.tareas[indiceTarea].objetivos.map((objetivo) => "")
      );
  }, [ejercicioActual, indiceTarea]);

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
      <CabeceraCodecat />
      <div className="container">
        <main className="codecat-principal contenedor-monitor row align-content-center flex-column">
          <div className="text-center">
            <a
              href="/codecat"
              className="enlace-volver boton-monitor btn btn-info align-self-start"
            >
              Volver
            </a>
          </div>
          <div className="monitor">
            {ejercicioActual && (
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
                  listarInputsTest()
                )}
                {!tareaCompletada && (
                  <div className="col-12 align-self-end text-center">
                    <Button
                      className="comprobar-ejercicio"
                      onClick={comprobarRespuestas}
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
