import { useEffect, useCallback } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const TareaHTMLTemplate = (props) => {
  const { indiceTarea } = useParams();
  const {
    ejercicioActual,
    listaInputs,
    setListaInputs,
    changeInput,
    renderizarJSX,
  } = props;

  const listarObjetivosOrdenados = (
    padreInput,
    indiceEtiqueta = 0,
    posicionHtml = 0
  ) => {
    if (typeof listaInputs !== "undefined" && listaInputs.length !== 0) {
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
              tabIndex="-1"
            />
            <span>{" >"}</span>
          </Col>
        </>
      );
    } else {
      return <div></div>;
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

  useEffect(() => {
    setListaInputs(
      new Array(
        cargarListaInputs(ejercicioActual?.tareas[indiceTarea].objetivos)
      ).fill("")
    );
  }, [cargarListaInputs, ejercicioActual?.tareas, indiceTarea, setListaInputs]);

  return renderizarJSX(() =>
    listarObjetivosOrdenados(ejercicioActual.tareas[indiceTarea].objetivos)
  );
};
