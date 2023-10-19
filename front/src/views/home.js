/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Login from "../components/Login";

const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPatients();
  }, []);
  return (
    <>
      {store.patients.length > 1 &&
        store.patients.map((patient) => (
          <ul key={patient._id}>
            <li>{patient.username}</li>
            <li>{patient.email}</li>
          </ul>
        ))}
      <Login />
    </>
  );
};

export default Home;
