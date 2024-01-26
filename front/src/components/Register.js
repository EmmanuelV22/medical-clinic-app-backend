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
        <div className="d-flex justify-content-center row">
          <Navbar />
          <button className="text-black button1 w-50 m-3" onClick={changeEmployee}>
            Cambia de Formulario
          </button>
          {!changeForm ? <RegisterEmployee /> : <RegisterPatient />}
        </div>
      ) : (
        <h2>Acceso reservado a los administradores</h2>
      )}
    </>
  );
};

export default Register;
