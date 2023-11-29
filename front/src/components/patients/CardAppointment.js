import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const CardAppointment = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {store.patient ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Turnos</h5>
            <p className="card-text">
              ¡Acá puedes sacar, modificar o cancelar un turno!
            </p>
            <Link to="/appointment-post" className="card-link">
              turnos
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </div>
  );
};

export default CardAppointment;
