import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const CardGetAppointment = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {store.patient ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Mis Proximas citas</h5>
            <p className="card-text">¡Acá puedes ver todos tus turnos!</p>
            <Link to={`/turnos-paciente/${store.patient.id}`} className="card-link">
              Por acá
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardGetAppointment;
