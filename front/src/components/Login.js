/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [personalID, setPersonalID] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await actions.login(personalID, password);

    if (data) {
      const loggedInEmployee = data.employees[0];
      if (loggedInEmployee.specialist === "admin") {
        navigate("/dashboard-admin");
        window.location.reload();
      } else {
        navigate("/dashboard-doctor");
        window.location.reload();
      }
    } else {
      alert("Erreur, vérifiez vos infos");
    }
  }

  return (
    <form className="mx-auto w-75" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-id-badge-2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 12h3v4h-3z" />
            <path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" />
            <path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
            <path d="M14 16h2" />
            <path d="M14 12h4" />
          </svg>
        </span>
        <input
          type="personalID"
          className="form-control border-l-0"
          aria-label="Username"
          aria-describedby="patient-addon1"
          placeholder="personalID"
          value={personalID}
          onChange={(e) => setPersonalID(e.target.value)}
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

export default Login;
