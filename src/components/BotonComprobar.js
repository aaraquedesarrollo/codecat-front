import { Button } from "react-bootstrap";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";

export const BotonComprobar = (props) => {
  const { acierto, error, submitTarea } = props;

  return (
    <div className="col-12 align-self-end text-center">
      <Button className="comprobar-ejercicio" onClick={() => submitTarea()}>
        Comprobar
      </Button>
      {acierto && <FaCheck className="icono-tarea ml-3"></FaCheck>}
      {error && <FaRegTimesCircle className="icono-tarea icono-error ml-3" />}
    </div>
  );
};
