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

    const data = await actions.sendChangePassword(dni);
    if (data.status === 200) {
      return alert(data.message);
    } else {
      return alert(data.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password === "") {
      return actions.showNotification("Datos incorrectos", "danger");
    } else {
      const data = await actions
        .loginPatient(dni, password)
        .then((res) => {
          actions.showNotification(res.message, "success");
          navigate(`/dashboard-patient`);
          window.location.reload();
        })
        .catch((err) => {
          actions.showNotification(err.message, "danger");
        });
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
