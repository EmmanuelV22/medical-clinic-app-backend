import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardMyPatients = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();
  return (
    <div>
      {store.employee &&
      store.employee.specialist !== "admin" &&
      store.employee.specialist !== "enfermero" &&
      store.employee.specialist !== "enfermera" ? (
        <div
          className="card-dashboard"
          style={{
            background: `url(
            "https://img.freepik.com/vector-gratis/ilustracion-concepto-medico-casa_114360-7060.jpg?w=740&t=st=1706234799~exp=1706235399~hmac=e038dfc5d659a3e3ae05736fbf2847710c9ca7e02797d03fe6cb95ca08a0564f"
          )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={() => navigate("/mis-pacientes")}
              className="card-button"
            >
              Mis pacientes
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado al personal medical!</h1>
      )}
    </div>
  );
};

export default CardMyPatients;
