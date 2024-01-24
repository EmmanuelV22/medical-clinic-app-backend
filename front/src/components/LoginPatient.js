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
    <form className="flip-card__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flip-card__input"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
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
  );
};

export default LoginPatient;
