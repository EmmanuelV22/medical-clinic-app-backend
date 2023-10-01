/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPatients();
  }, []);
  return (
    <div>
      {store.patients.map((patient) => (
        <ul>
          <li key={patient._id}>{patient.username}</li>
          <li>{patient.email}</li>
        </ul>
      ))}
    </div>
  );
};

export default Home;
