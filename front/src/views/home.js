/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Register from "../components/Register";
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
          <ul key={patient.id} className="bg-danger">
            <li>{patient.firstname}</li>
            <li>{patient.lastname}</li>
          </ul>
        ))}
      <Login />
      <Register />
    </>
  );
};

export default Home;
