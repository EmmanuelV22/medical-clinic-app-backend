import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardTreatments = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  return (
    <div>
      {store.patient ? (
        <div
          className="card-dashboard"
          style={{
            background: `url(
        "https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-pildora-dibujada-mano_23-2150747133.jpg?w=360&t=st=1706235885~exp=1706236485~hmac=2ea9f51231db0b91bd95ac0ab3e3d2977e8765e93e530417aae54217c79529fe"
      )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={() => navigate(`/mi-tratamiento/${store.patient.id}`)}
              to={`/mi-tratamiento/${store.patient.id}`}
              className="card-button"
            >
              Mis tratamientos
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardTreatments;
