import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardAppointment = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();
  return (
    <div>
      {store.patient ? (
        <div
          className="card-dashboard"
          style={{
            background: `url(
      "https://img.freepik.com/vector-gratis/mujer-reservando-cita-calendario_23-2148562875.jpg?w=740&t=st=1706236013~exp=1706236613~hmac=48d6a39bd8a30942b951c159f98ab4a281dec753d43b1b04b0a7a873ece188c7"
    )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={() => navigate("/planificar-turno")}
              className="card-button"
            >
              Agendar un turno
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardAppointment;
