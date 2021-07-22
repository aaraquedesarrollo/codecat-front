export const Ejercicio = (props) => {
  const { ejercicio } = props;
  return (
    <>
      <li className="elemento-ejercicios col-3">
        <div className="ejercicio">
          <ul className="list-unstyled">
            <li>Ejercicio: {ejercicio.nombre}</li>
            <li>Tema: {ejercicio.tema}</li>
            <li>Nivel Requerido: {ejercicio.nivelRequerido}</li>
          </ul>
        </div>
      </li>
    </>
  );
};
