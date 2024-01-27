/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../store/appContext";

const LoginPatient = () => {
  const { actions } = useContext(Context);
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  async function handlePassword(e) {
    e.preventDefault();

    const response = await actions.sendChangePassword(dni);
    if (response?.status === 200) {
      actions.showNotification(response.data.message, "success");
    } else {
      actions.showNotification(response, "danger");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await actions.loginPatient(dni, password);
    if (response.status === 201) {
      actions.showNotification(response.data.message, "success");
      navigate(`/dashboard-patient`);
      window.location.reload();
    } else {
      actions.showNotification(response, "danger");
    }
  }

  return (
    <>
      <form className="formu2" onSubmit={handleSubmit}>
        <p id="heading">Bienvenido a Clinic'app!</p>
        <div className="field">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-id"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
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
          <input
            type="text"
            className="input-field"
            placeholder="DNI"
            autoComplete="off"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
        <div className="field">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btnn">
          <button className="button1">Entrar (Paciente)</button>
        </div>
      </form>
      <button onClick={() => window.location.reload()} className="button3 mb-2">
        Cambiar a funcionario
      </button>
      <button className="button3" onClick={handlePassword}>
        ¿Olvidaste la contraseña?
      </button>
    </>
  );
};

export default LoginPatient;
