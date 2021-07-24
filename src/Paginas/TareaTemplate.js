import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CabeceraCodecat } from "../components/CabeceraCodecat";
import { AuthContext } from "../context/AuthContext";
import { GeneralContext } from "../context/GeneralContext";

export const TareaTemplate = () => {
  const { idTrabajo } = useParams();
  const { urlApi } = useContext(GeneralContext);
  const { token } = useContext(AuthContext);
  const [formacionActual, setFormacionActual] = useState(null);
  const [indiceTarea, setIndiceTarea] = useState(0);
  const [listaInputs, setListaInputs] = useState([]);
  const [error, setError] = useState(false);
  const [acierto, setAcierto] = useState(false);

  const cargarFormacion = useCallback(async () => {
    const resp = await fetch(urlApi + "trabajos/obtener-trabajo/" + idTrabajo);
    const resultado = await resp.json();
    setFormacionActual(resultado);
  }, [idTrabajo, urlApi]);

  const paginaAnterior = () => {
    if (indiceTarea === 0) {
      setIndiceTarea(formacionActual?.tareas.length - 1);
      return;
    }
    setIndiceTarea(indiceTarea - 1);
  };

  const paginaSiguiente = () => {
    if (indiceTarea === formacionActual?.tareas.length - 1) {
      setIndiceTarea(0);
      return;
    }
    setIndiceTarea(indiceTarea + 1);
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

  const listarObjetivosOrdenados = (padreInput, indiceCosa = 0) => {
    if (formacionActual) {
      if (typeof listaInputs !== "undefined" && listaInputs.length !== 0)
        return (
          <>
            <Col xs="12" className="input-ejercicio">
              <span>{"< "}</span>
              <input
                type="text"
                value={listaInputs[indiceCosa]}
                onChange={(e) => changeInput(e, indiceCosa)}
              />
              <span>{" >"}</span>
            </Col>
            {padreInput.children &&
              padreInput.children.map((erninyo, indiceMap) =>
                listarObjetivosOrdenados(erninyo, indiceCosa + (indiceMap + 1))
              )}
            <Col xs="12" className="input-ejercicio ultimo-input">
              <span>{"</ "} </span>
              <input type="text" readOnly value={listaInputs[indiceCosa]} />
              <span>{" >"}</span>
            </Col>
          </>
        );
    }
  };

  const cargarListaInputs = useCallback(
    (indice, iterando = [], contador = 0) => {
      contador = contador + 1;
      if (iterando.children) {
        for (const padre of iterando.children) {
          contador = cargarListaInputs(indice + 1, padre, contador++);
        }
      }
      return contador;
    },
    []
  );

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
        `${urlApi}historial/anyadir-tarea/${idTrabajo}/${formacionActual.tareas[indiceTarea]._id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    cargarFormacion();
  }, [cargarFormacion]);

  useEffect(() => {
    let indice = 0;
    setListaInputs(
      new Array(
        cargarListaInputs(
          indice,
          formacionActual?.tareas[indiceTarea].objetivos
        )
      ).fill("")
    );
  }, [cargarListaInputs, formacionActual?.tareas, indiceTarea]);

  return (
    <div className="contenedor-body container-fluid">
      {formacionActual && (
        <>
          {" "}
          <CabeceraCodecat />
          <div className="container">
            <main className="codecat-principal row justify-content-center">
              <a
                href="/codecat"
                className="col-1 btn btn-info align-self-start"
              >
                Volver
              </a>
              <div className="monitor">
                <Row className="contenido-ejercicio">
                  <Col onClick={paginaAnterior} xs="2" className="text-center">
                    <span className="boton-tarea">{"<"}</span>
                  </Col>
                  <Col xs="8" className="text-center">
                    {formacionActual?.tareas[indiceTarea].nombre}
                  </Col>
                  <Col onClick={paginaSiguiente} xs="2" className="text-center">
                    <span className="boton-tarea">{">"}</span>
                  </Col>
                  <Col as="h2" xs="12" className="enunciado text-center">
                    {formacionActual &&
                      formacionActual?.tareas[indiceTarea].descripcion}
                  </Col>
                  {listarObjetivosOrdenados(
                    formacionActual.tareas[indiceTarea].objetivos
                  )}
                  <Button
                    className="comprobar-ejercicio"
                    onClick={() =>
                      setRespuesta(
                        formacionActual.tareas[indiceTarea].objetivos
                      )
                    }
                  >
                    Comprobar
                  </Button>
                  {error && <p>Parece que hay algo que tienes mal</p>}
                  {acierto && <p> Correcto!</p>}
                </Row>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};
