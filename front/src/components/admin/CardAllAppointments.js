import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardAllAppointments = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();
  return (
    <div>
      {store.employee && store.employee.specialist === "admin" ? (
        <div
          className="card employee-card position-relative container-fluid"
          style={{ width: "18rem", height: "10rem", textAlign: "center" }}
        >
          <div className="card-body d-flex align-items-center justify-content-center">
            <p className="card-text pt-4">¡Acá puedes ver todos los turnos!</p>
            <button
              onClick={() => navigate("/turnos")}
              className="card-link link-access-employees"
            >
              Lista de turnos
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </div>
  );
};

export default CardAllAppointments;
