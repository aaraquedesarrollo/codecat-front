import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Col } from "react-bootstrap";
import { GeneralContext } from "../../context/GeneralContext";
export const HeaderEjercicio = (props) => {
  const { datosEjercicio, idTrabajo } = props;
  const { token } = useContext(AuthContext);
  const { urlApi } = useContext(GeneralContext);
  const [input1, setInput1] = useState("");
  const [acierto, setAcierto] = useState(false);
  const [texto, setTexto] = useState("");

  const comprobarEjercicio = useCallback(async () => {
    if (input1 === datosEjercicio.objetivos[0]) {
      setAcierto(true);
      await fetch(
        `${urlApi}historial/anyadir-tarea/${idTrabajo}/${datosEjercicio._id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
      setTexto("");
    } else {
      setTexto("Este header no es tan chulo!!");
      setAcierto(false);
    }
  }, [
    datosEjercicio._id,
    datosEjercicio.objetivos,
    idTrabajo,
    input1,
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
      <Col xs="12" className="texto-ejercicio">
        <span>{"<h1>"}</span>
        <span>Esta es una cabecera</span>
        <span>{" </h1>"}</span>
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
