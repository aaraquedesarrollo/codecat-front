import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Col } from "react-bootstrap";
import { GeneralContext } from "../../context/GeneralContext";
export const ListaSinOrdenar = (props) => {
  const { datosEjercicio, idTrabajo } = props;
  const { token } = useContext(AuthContext);
  const { urlApi } = useContext(GeneralContext);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [acierto, setAcierto] = useState(false);
  const [texto, setTexto] = useState("");

  const comprobarEjercicio = useCallback(async () => {
    if (
      input1 === datosEjercicio.objetivos[0] &&
      input2 === datosEjercicio.objetivos[1] &&
      input3 === datosEjercicio.objetivos[2]
    ) {
      setAcierto(true);
      const response = await fetch(
        `${urlApi}historial/anyadir-tarea/${idTrabajo}/${datosEjercicio._id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
      await response.json();
      setTexto("");
    } else {
      setTexto("Esta lista no es para fliparlo");
      setAcierto(false);
    }
  }, [
    datosEjercicio._id,
    datosEjercicio.objetivos,
    idTrabajo,
    input1,
    input2,
    input3,
    token,
    urlApi,
  ]);

  return (
    <>
      <Col as="h2" xs="12" className="enunciado text-center">
        {datosEjercicio.descripcion}
      </Col>
      <Col xs="12" className="input-ejercicio primer-input">
        <span>{"< "}</span>
        <input type="text" onChange={(e) => setInput1(e.target.value)} />
        <span>{" >"}</span>
      </Col>

      <Col xs="8" className="input-ejercicio">
        <span>{"< "}</span>
        <input type="text" onChange={(e) => setInput2(e.target.value)} />
        <span>{" >"}</span>
      </Col>
      <Col xs="12" className="texto-ejercicio">
        Primer elemento
      </Col>
      <Col xs="8" className="input-ejercicio">
        <span>{"</ "}</span>
        <input type="text" value={input2} readOnly />
        <span>{" >"}</span>
      </Col>
      <Col xs="8" className="input-ejercicio">
        <span>{"< "}</span>
        <input type="text" onChange={(e) => setInput3(e.target.value)} />
        <span>{" >"}</span>
      </Col>
      <Col xs="12" className="texto-ejercicio">
        Segundo elemento
      </Col>
      <Col xs="8" className="input-ejercicio  justify-self-end">
        <span>{"</ "}</span>
        <input type="text" value={input3} readOnly />
        <span>{" >"}</span>
      </Col>
      <Col xs="12" className="input-ejercicio ultimo-input">
        <span>{"</ "} </span>
        <input type="text" value={input1} readOnly />
        <span>{" >"}</span>
      </Col>

      <div className="comprobar-ejercicio">
        <button onClick={comprobarEjercicio} className="btn btn-success">
          Comprobar
        </button>
        <span>
          {acierto && " ¡Está flama!"}
          {texto !== "" && texto}
        </span>
      </div>
    </>
  );
};
