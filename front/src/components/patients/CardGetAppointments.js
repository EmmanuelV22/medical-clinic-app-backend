import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardGetAppointment = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  return (
    <div>
      {store.patient ? (
        <div
          className="card-dashboard"
          style={{
            background: `url(
      "https://img.freepik.com/vector-gratis/empleado-que-marca-dia-limite-hombre-lapiz-senalando-fecha-evento-tomando-nota-calendario-ilustracion-vector-horario-agenda-gestion-tiempo_74855-8347.jpg?w=740&t=st=1706235104~exp=1706235704~hmac=9b168c82561c03f5efaa2e23ce8bea3e3d740a1e6fea3ea9bfbaed192def5d05"
    )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={() => navigate(`/turnos-paciente/${store.patient.id}`)}
              className="card-button"
            >
              Mis turnos
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los pacientes!</h1>
      )}
    </div>
  );
};

export default CardGetAppointment;
