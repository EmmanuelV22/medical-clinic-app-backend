import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const CardAllEmployees = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      {store.employee && store.employee.specialist === "admin" ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Lista de empleados</p>
            <Link to="/empleados" className="card-link">
              Lista de empleados
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </div>
  );
};

export default CardAllEmployees;
