import { Col } from "react-bootstrap";

export const CabeceraMonitor = (props) => {
  const { indiceTarea, paginaAnterior, paginaSiguiente, ejercicioActual } =
    props;
  return (
    <>
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
        {ejercicioActual && ejercicioActual?.tareas[indiceTarea].descripcion}
      </Col>
    </>
  );
};
