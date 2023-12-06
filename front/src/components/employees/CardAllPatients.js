import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const CardAllPatients = () => {
  const { store } = useContext(Context);
  return (
    <div>
      {store.employee &&
      store.employee.specialist !== "admin" &&
      store.employee.specialist !== "enfermero" &&
      store.employee.specialist !== "enfermera" ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Lista de pacientes</h5>
            <p className="card-text">Lista de pacientes</p>
            <Link to="/pacientes" className="card-link">
              Lista de pacientes
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado al personal medical!</h1>
      )}
    </div>
  );
};

export default CardAllPatients;
