import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardAllEmployees = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  return (
    <>
      {store.employee && store.employee.specialist === "admin" ? (
        <div
          className="card-dashboard mb-3"
          style={{
            background: `url(
            "https://img.freepik.com/fotos-premium/equipo-trabajadores-salud-doctor-enfermera-cirujano-cirujano-cirujano-ilustracion-vectorial-dibujos-animados-st_941097-8571.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1700611200&semt=ais"
          )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={() => navigate("/empleados")}
              className="card-button"
            >
              Lista de empleados
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </>
  );
};

export default CardAllEmployees;
