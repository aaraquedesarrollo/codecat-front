import { PropTypes } from "prop-types";
import { Ejercicio } from "./Ejercicio";

export const Habitacion = (props) => {
  const { abrirEjercicios } = props;
  const ejercicios = [
    { numero: 1, nombre: "header", nivelRequerido: "1", tema: "html" },
    { numero: 2, nombre: "main", nivelRequerido: "2", tema: "html" },
    { numero: 3, nombre: "footer", nivelRequerido: "2", tema: "html" },
    { numero: 4, nombre: "paragraph", nivelRequerido: "2", tema: "html" },
    { numero: 5, nombre: "list", nivelRequerido: "3", tema: "html" },
    { numero: 6, nombre: "button", nivelRequerido: "3", tema: "html" },
  ];
  return (
    <section className="col-9">
      <div className="habitacion row">
        {abrirEjercicios && (
          <section className="ventana-ejercicios col-12">
            <ul className="listado-ejercicios list-unstyled row">
              {ejercicios.map((ejercicio) => (
                <Ejercicio key={ejercicio.numero} ejercicio={ejercicio} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
};

Habitacion.propTypes = {
  abrirEjercicios: PropTypes.bool.isRequired,
};
