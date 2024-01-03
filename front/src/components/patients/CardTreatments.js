import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const CardTreatments = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {store.patient ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Tratamientos</h5>
            <p className="card-text">¡Acá puedes ver tus tratamientos!</p>
            <Link
              to={`/mi-tratamiento/${store.patient.id}`}
              className="card-link"
            >
              tratamientos
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardTreatments;
