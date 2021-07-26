import { useCallback, useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { BotonComprobar } from "../components/BotonComprobar";
import { CabeceraCodecat } from "../components/CabeceraCodecat";
import { CabeceraMonitor } from "../components/CabeceraMonitor";
import { TareaCompletada } from "../components/TareaCompletada";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";
import { TareaHTMLTemplate } from "./TareaHTMLTemplate";
import { TareaTestTemplate } from "./TareaTestTemplate";

export const TareaTemplate = () => {
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
    history.push(`/codecat/ejercicios/${idTrabajo}/${+indiceTarea - 1}`);
    setError(false);
    setAcierto(false);
  };

  const paginaSiguiente = () => {
    history.push(`/codecat/ejercicios/${idTrabajo}/${+indiceTarea + 1}`);
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

  const submitRespuestaHTML = async (padre) => {
    try {
      comprobarRespuestaHTML(padre);
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

  const comprobarRespuestaHTML = (padre, indice = 0) => {
    try {
      let respuestas;
      if (padre.children) {
        respuestas = padre.children.map((padreMap, indiceMap) =>
          comprobarRespuestaHTML(padreMap, indice + (indiceMap + 1))
        );
        if (respuestas.includes(false)) throw new Error();
      }
    } catch (err) {
      throw new Error();
    }
    if (padre.etiqueta === listaInputs[indice]) return true;

    throw new Error();
  };

  const comprobarRespuestasTest = async () => {
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
      setAcierto(true);
      setError(false);
      await fetch(
        `${urlApi}historial/anyadir-tarea/${idTrabajo}/${ejercicioActual.tareas[indiceTarea]._id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
      cargarTareasCompletadas();
    }
  };

  const enrutadorTareas = () => {
    if (ejercicioActual) {
      const tipo = ejercicioActual.tareas[indiceTarea].tipo;
      if (tipo === "html") {
        return (
          <>
            <TareaHTMLTemplate
              ejercicioActual={ejercicioActual}
              listaInputs={listaInputs}
              setListaInputs={setListaInputs}
              changeInput={changeInput}
              renderizarJSX={renderizarJSX}
            />
            {!tareaCompletada && (
              <BotonComprobar
                acierto={acierto}
                error={error}
                submitTarea={() =>
                  submitRespuestaHTML(
                    ejercicioActual.tareas[indiceTarea].objetivos
                  )
                }
              ></BotonComprobar>
            )}
          </>
        );
      } else if (tipo === "test") {
        return (
          <>
            <TareaTestTemplate
              ejercicioActual={ejercicioActual}
              listaInputs={listaInputs}
              setListaInputs={setListaInputs}
              changeInput={changeInput}
              renderizarJSX={renderizarJSX}
            />
            {!tareaCompletada && (
              <BotonComprobar
                acierto={acierto}
                error={error}
                submitTarea={() => comprobarRespuestasTest()}
              ></BotonComprobar>
            )}
          </>
        );
      }
    }
  };

  useEffect(() => {
    cargarEjericicio();
    cargarTareasCompletadas();
  }, [cargarEjericicio, cargarTareasCompletadas]);

  useEffect(() => {
    if (tareasCompletadas && ejercicioActual) {
      if (tareasCompletadas.includes(ejercicioActual.tareas[indiceTarea]._id)) {
        setTareaCompletada(true);
      } else {
        setTareaCompletada(false);
      }
    }
  }, [ejercicioActual, indiceTarea, tareasCompletadas]);

  const renderizarJSX = (callback) => {
    return callback();
  };

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
                <CabeceraMonitor
                  paginaAnterior={paginaAnterior}
                  paginaSiguiente={paginaSiguiente}
                  ejercicioActual={ejercicioActual}
                  indiceTarea={indiceTarea}
                />
                {tareaCompletada ? (
                  <TareaCompletada
                    ejercicioActual={ejercicioActual}
                    indiceTarea={indiceTarea}
                  />
                ) : (
                  enrutadorTareas()
                )}
              </Row>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
