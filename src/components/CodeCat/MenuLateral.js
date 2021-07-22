import { PropTypes } from "prop-types";

export const MenuLateral = (props) => {
  const { toggleAbrirEjercicios } = props;
  return (
    <section className="seccion-menu col-3">
      <div className="menu">
        <div className="info-cat">
          <ul className="lista-info list-unstyled">
            <li>Nombre:</li>
            <li>Nivel:</li>
            <li>Posición:</li>
            <li>Galletitas:</li>
          </ul>
          <ul className="lista-info list-unstyled">
            <li>Enfo-ca't</li>
            <li>Over 9000</li>
            <li>CEO</li>
            <li>Ilimitadas</li>
          </ul>
        </div>
        <button
          className="boton-menu btn btn-light"
          type="button"
          onClick={toggleAbrirEjercicios}
        >
          Formación
        </button>
        <button className="boton-menu btn btn-light" type="button">
          Trabajos
        </button>
        <button className="boton-menu btn btn-light" type="button">
          Tienda
        </button>
      </div>
    </section>
  );
};

MenuLateral.propTypes = {
  toggleAbrirEjercicios: PropTypes.func.isRequired,
};
