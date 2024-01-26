import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";

const CardMyHistory = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate()

  return (
    <div>
      {store.patient ? (
        <div
          className="card-dashboard"
          style={{
            background: `url(
      "https://img.freepik.com/vector-gratis/hombre-leyendo-traves-ilustracion-vector-plano-lupa_778687-1174.jpg?w=360&t=st=1706236206~exp=1706236806~hmac=25c24504e91b4de37f7bfdb3afbc7b51b5d1e1edc03f64cd27d393b71aba97d2"
    )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={()=> navigate(`/patient-history/${store.patient.id}`)}
              className="card-button"
            >
              Historia
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardMyHistory;
