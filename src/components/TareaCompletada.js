import { Col } from "react-bootstrap";

export const TareaCompletada = (props) => {
  const { ejercicioActual, indiceTarea } = props;
  return (
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
      <div>
        <p>{`Has ganado ${ejercicioActual.tareas[indiceTarea].recompensa.chuches} chuches y ${ejercicioActual.tareas[indiceTarea].recompensa.experiencia} puntos de experiencia`}</p>
      </div>
    </Col>
  );
};
