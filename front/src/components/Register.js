import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import RegisterEmployee from "./RegisterEmployee";
import RegisterPatient from "./RegisterPatient";
import { Context } from "../store/appContext";

const Register = () => {
  const { store } = useContext(Context);
  const [changeForm, setChangeForm] = useState(false);

  function changeEmployee() {
    setChangeForm(!changeForm);
  }

  return (
    <>
      {store?.employee && store.employee?.specialist === "admin" ? (
        <>
          <Navbar />
          <button className="btn btn-success" onClick={changeEmployee}>
            Cambia de Formulario
          </button>
          {!changeForm ? <RegisterEmployee /> : <RegisterPatient />}
        </>
      ) : (
        <h2>Acceso reservado a los administradores</h2>
      )}
    </>
  );
};

export default Register;
