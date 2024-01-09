import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const CardMyHistory = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {store.patient ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Historia</h5>
            <p className="card-text">Aqui puedes ver tu Historia medica</p>
            <Link
              to={`/patient-history/${store.patient.id}`}
              className="card-link"
            >
              Historia
            </Link>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardMyHistory;
