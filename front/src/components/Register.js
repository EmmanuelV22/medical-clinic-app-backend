import React, { useState } from "react";
import Navbar from "./Navbar";
import RegisterEmployee from "./RegisterEmployee";
import RegisterPatient from "./RegisterPatient";

const Register = () => {
  const [changeForm, setChangeForm] = useState(false);

  function changeEmployee() {
    setChangeForm(!changeForm);
  }

  return (
    <>
      <Navbar />
      <button className="btn btn-success" onClick={changeEmployee}>
        Cambia de Formulario
      </button>
      {!changeForm ? <RegisterEmployee /> : <RegisterPatient />}
    </>
  );
};

export default Register;
