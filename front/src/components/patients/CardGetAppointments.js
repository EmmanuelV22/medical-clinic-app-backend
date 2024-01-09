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
            <p className="card-text">¡Acá puedes ver todos tus turnos!</p>
            <Link to="/turnos-paciente" className="card-link">
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
