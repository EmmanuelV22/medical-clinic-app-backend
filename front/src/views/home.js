/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    actions.getPatients();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">
        Test Tailwind
      </h1>
      {store.patients.map((patient) => (
        <ul>
          <li key={patient._id}>{patient.username}</li>
          <li>{patient.email}</li>
        </ul>
      ))}
      <div>
        <form>
          <input type="email" />
          <input type="password" />
          <button>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
