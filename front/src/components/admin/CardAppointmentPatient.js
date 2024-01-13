import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardAppointmentPatient = () => {
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
            <p className="card-text pt-4">¡Agendar pacientes!</p>
            <button
              onClick={() => navigate("/register")}
              className="card-link link-access-employees"
            >
              Sacar turnos
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </div>
  );
};

export default CardAppointmentPatient;
