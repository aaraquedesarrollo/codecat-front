import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const TareaTestTemplate = (props) => {
  const { indiceTarea } = useParams();
  const {
    ejercicioActual,
    listaInputs,
    setListaInputs,
    changeInput,
    renderizarJSX,
  } = props;

  const listarInputsTest = () => {
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
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    if (ejercicioActual)
      setListaInputs(
        ejercicioActual.tareas[indiceTarea].objetivos.map((objetivo) => "")
      );
  }, [ejercicioActual, indiceTarea, setListaInputs]);

  return renderizarJSX(listarInputsTest);
};
