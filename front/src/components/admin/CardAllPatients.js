import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardAllPatients = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  return (
    <>
      {store.employee && store.employee.specialist === "admin" ? (
        <div
          className="card-dashboard mb-3"
          style={{
            background: `url(
            "https://www.patients-association.org.uk/images/52c14c01-8ebf-4817-adce-9cea377db618/cropped?width=1600&height=628"
          )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="card-details">
            <button
              onClick={() => navigate("/pacientes")}
              className="card-button"
            >
              Lista de pacientes
            </button>
          </div>
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </>
  );
};

export default CardAllPatients;
