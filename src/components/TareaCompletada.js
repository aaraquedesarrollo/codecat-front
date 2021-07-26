import { Col } from "react-bootstrap";

export const TareaCompletada = (props) => {
  const { ejercicioActual, indiceTarea } = props;
  return (
    <Col xs="12" className="text-center">
      <img
        src="/img/mariochiquito.png"
        alt="Mario felicitandote por haber completado la tarea"
      />
      <div>
        <p className="mt-2">¡Está flama!</p>
      </div>
      <div>
        <p>{`Has ganado ${ejercicioActual.tareas[indiceTarea].recompensa.chuches} chuches y ${ejercicioActual.tareas[indiceTarea].recompensa.experiencia} puntos de experiencia`}</p>
      </div>
    </Col>
  );
};
