import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const CardAppointments = () => {
  const { store } = useContext(Context);
  return (
    <div>
      {store.employee &&
      store.employee.specialist !== "admin" &&
      store.employee.specialist !== "enfermero" &&
      store.employee.specialist !== "enfermera" ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Mis turnos</h5>
            <p className="card-text">Lista de turnos</p>
            <Link to="/mis-turnos" className="card-link">
              Clic acá
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado al personal medico!</h1>
      )}
    </div>
  );
};

export default CardAppointments;
