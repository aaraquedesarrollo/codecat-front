import { useCallback } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { EjerciciosContext } from "../../context/EjerciciosContext";
import { Ejercicio } from "./Ejercicio";

export const Habitacion = () => {
  /* const ejercicios = [
    { numero: 1, nombre: "header", formacion_minima: "1", tema: "html" },
    { numero: 2, nombre: "main", formacion_minima: "2", tema: "html" },
    { numero: 3, nombre: "footer", formacion_minima: "2", tema: "html" },
    { numero: 4, nombre: "paragraph", formacion_minima: "2", tema: "html" },
    { numero: 5, nombre: "list", formacion_minima: "3", tema: "html" },
    { numero: 6, nombre: "button", formacion_minima: "3", tema: "html" },
  ]; */
  const { datosFormaciones } = useContext(EjerciciosContext);

  return (
    <section className="col-9">
      <div className="habitacion row">
        <section className="ventana-ejercicios col-12">
          <ul className="listado-ejercicios list-unstyled row">
            {datosFormaciones.map((ejercicio) => (
              <Ejercicio key={ejercicio._id} ejercicio={ejercicio} />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
