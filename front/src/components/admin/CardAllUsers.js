import React from "react";
import { Link } from "react-router-dom";

const CardAllUsers = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Lista completa de usuarios
        </h6>
        <p className="card-text">
          ¡Acá puedes consultar todos los pacientes y empleados que están
          registrados!
        </p>
        <a href="/admin-view" className="card-link">
          Card link
        </a>
        <Link to="/admin-view" className="card-link">
          Another link
        </Link>
      </div>
    </div>
  );
};

export default CardAllUsers;
