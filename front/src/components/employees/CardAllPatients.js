import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const CardAllPatients = () => {
  const { store } = useContext(Context);
  let navigate = useNavigate();

  return (
    <div>
      {store.employee && store.employee.specialist !== "admin" ? (
        <div
          className="card-dashboard"
          style={{
            background: `url(
          "https://imgs.search.brave.com/mgDBRm8_VBFuH2eIdA7fMjHcqIDIi5KZwk9XQ1QUxys/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/NTI4NzUyOC9mci92/ZWN0b3JpZWwvdmFj/Y2luYXRpb24uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTBE/WTB3WFFUNGMyTGR0/aXhwbXh4WWVrNzVB/Rm5YbmhJM3oySmpW/dTU0ZUk9"
        )`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
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
        <h1>Espacio resevado al personal medical!</h1>
      )}
    </div>
  );
};

export default CardAllPatients;
