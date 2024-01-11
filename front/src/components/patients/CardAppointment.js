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
            <h5 className="card-title">Agendarse</h5>
            <p className="card-text">¡Acá puedes sacar un turno!</p>
            <Link to="/planificar-turno" className="card-link">
              turnos
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardAppointment;
