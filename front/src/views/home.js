/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Register from "../components/Register";

const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPatients();
  }, []);
  return (
    <>
      {store.patients.length > 1 &&
        store.patients.map((patient) => (
          <ul key={patient.id}>
            <li>{patient.firstname}</li>
            <li>{patient.lastname}</li>
            <li>{patient.dni}</li>
            <li>{patient.address}</li>
            <li>{patient.birthday}</li>
          </ul>
        ))}
      <Register />
    </>
  );
};

export default Home;
