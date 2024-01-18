import React from "react";
import { useNavigate } from "react-router-dom";

const CardMap = () => {
  let navigate = useNavigate();

  return (
    <div>
      
        <div
          className="card employee-card position-relative container-fluid"
          style={{ width: "18rem", height: "10rem", textAlign: "center" }}
        >
          <div className="card-body d-flex align-items-center justify-content-center">
            <p className="card-text pt-4">
              ¡Aqui puedes encontrar la ubicacion de nuestra clinica!
            </p>
            <button
              onClick={() => navigate("/clinc/maps")}
              className="card-link link-access-employees"
            >
              Ubicacion
            </button>
          </div>
        </div>
     
      
    </div>
  );
};

export default CardMap;
