/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import LoginPatient from "./LoginPatient";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [personalID, setPersonalID] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password === "") {
      return actions.showNotification("Datos incorrectos", "danger");
    } else {
      const data = await actions.login(personalID, password);


      if (data.status === 201) {
        actions.showNotification("Inicio de sesion exitoso", "success");
        
        const loggedInEmployee = data.employees[0] 


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
        actions.showNotification("Datos incorrectos", "danger");

      }
    }
  }

  return (
    <div 
    className="wrapper"
    >
      <div
       className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Empleado</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="flip-card__input"
                  aria-label="Username"
                  aria-describedby="patient-addon1"
                  placeholder="personal ID"
                  value={personalID}
                  onChange={(e) => setPersonalID(e.target.value)}
                  required
                />
                <input
                  className="flip-card__input"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="flip-card__btn">Iniciar Sessión</button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Paciente</div>
              <LoginPatient />
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;
