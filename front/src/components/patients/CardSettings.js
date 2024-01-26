import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";

const CardSettings = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();
  return (
    <div>
      {store.patient ? (
        <div
          className="card-dashboard"
          style={{
            background: `url(
      "https://img.freepik.com/vector-gratis/mini-personas-maquinaria-engranajes_24877-56137.jpg?w=740&t=st=1706235940~exp=1706236540~hmac=af6c81d1165e4f320afa6f35bb2469623543891f3672326cb7efa73470e4fc33"
    )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              className="card-button"
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
