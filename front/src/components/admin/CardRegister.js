import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardRegister = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();
  return (
    <>
      {store.employee && store.employee.specialist === "admin" ? (
        <div
          className="card-dashboard mb-3"
          style={{
            background: `url(
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuMLc2CeufoyW0R0tZDrq4DpbTdbdkkAcUbw&usqp=CAU"
            )`,
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={() => navigate("/register")}
              className="card-button"
            >
              Crear una cuenta
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </>
  );
};

export default CardRegister;
