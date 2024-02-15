/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import LoginPatient from "./LoginPatient";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [personal_id, setpersonal_id] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // if (password === "") {
    //   return actions.showNotification("Datos incorrectos", "danger");
    // } else {
      const data = await actions.login(personal_id, password);
      console.log("c log de data: ",data)
      if (data?.status && (data?.status === 201 || data?.status === 200)) {
        actions.showNotification("Inicio de sesion exitoso", "success");

        const loggedInEmployee = data.employees[0];

        if (loggedInEmployee.specialist === "admin") {
          navigate("/dashboard-admin");

          window.location.reload();
        }
        if (
          loggedInEmployee.specialist === "enfermero" ||
          loggedInEmployee.specialist === "enfermera"
        ) {
          navigate("/dashboard-nurse");

          window.location.reload();
        }
        if (
          loggedInEmployee.specialist !== "admin" &&
          loggedInEmployee.specialist !== "enfermero" &&
          loggedInEmployee.specialist !== "enfermera"
        ) {
          navigate("/dashboard-doctor");
          window.location.reload();
        }
      } else {
        if (data === undefined) {
          actions.showNotification(
            "Fallo la conexion con el servidor",
            "danger"
          );
        } else {
          actions.showNotification("Datos incorrectos", "danger");
        }
      // }
    }
  }

  return (
    <div className=" d-flex flex-column align-items-center justify-content-center">
      <div className="cardd d-flex flex-column align-items-center justify-content-center ">
        {!isPatient && (
          <div className="card2">
            <form className="formu" onSubmit={handleSubmit}>
              <p id="heading">Bienvenido a Clinic'app!</p>
              <div className="field">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-id-badge-2"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
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
                <input
                  type="text"
                  className="input-field"
                  placeholder="ID"
                  autoComplete="off"
                  value={personal_id}
                  onChange={(e) => setpersonal_id(e.target.value)}
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
                <button className="button1 shadow homeHover">
                  Entrar (Funcionario)
                </button>
              </div>
              {!isPatient && (
                <div className="">
                  <span
                    onClick={() => setIsPatient(!isPatient)}
                    className=" btn shadow button1 homeHover"
                  >
                    Cambiar a Paciente
                  </span>
                </div>
              )}
            </form>
          </div>
        )}

        {isPatient && <LoginPatient />}
      </div>
    </div>
  );
};

export default Login;
