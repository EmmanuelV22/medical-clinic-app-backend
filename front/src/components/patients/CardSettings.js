import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";

const CardSettings = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();
  return (
    <div>
      {store.patient ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">AJUSTES</h5>
            <p className="card-text">Modifica tu Informacion</p>
            <button
              className="btn btn-success"
              onClick={() => navigate(`/patient/update/${store.patient.id}`)}
            >
              Modificar
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardSettings;
