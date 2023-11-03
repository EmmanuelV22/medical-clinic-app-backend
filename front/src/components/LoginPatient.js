/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";

const LoginPatient = () => {
  const { store, actions } = useContext(Context);
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const success = actions.loginPatient(dni, password);

    if (success) {
      setDni("");
      setPassword("");
      navigate("/dashboard-patient");
    } else {
      alert("Error, log impossible");
    }
  }

  return (
    <form className="mx-auto w-75" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-id"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
            <path d="M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M15 8l2 0" />
            <path d="M15 12l2 0" />
            <path d="M7 16l10 0" />
          </svg>
        </span>
        <input
          type="dni"
          className="form-control border-l-0"
          aria-label="Username"
          aria-describedby="patient-addon1"
          placeholder="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-lock"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
          </svg>
        </span>
        <input
          type="password"
          className="form-control border-l-0"
          aria-label="password"
          aria-describedby="patient-addon1"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mx-auto text-center">
        <button className="w-40 text-center bg-blue-500">Iniciar sesión</button>
      </div>
    </form>
  );
};

export default LoginPatient;
