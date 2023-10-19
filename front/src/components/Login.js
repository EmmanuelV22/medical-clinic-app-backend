/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Email:", email); // Ajout de cette console log
    console.log("Password:", password); // Ajout de cette console log
    actions.login(email, password);
    setEmail("");
    setPassword("");
    navigate("/register");
  }

  return (
    <form className="input-group mb-3 w-75 mx-auto" onSubmit={handleSubmit}>
      <span className="input-group-text" id="patient-addon1">
        @
      </span>
      <input
        type="email"
        className="form-control"
        aria-label="Username"
        aria-describedby="patient-addon1"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <span className="input-group-text" id="patient-addon1">
        @
      </span>
      <input
        type="password"
        className="form-control"
        aria-label="password"
        aria-describedby="patient-addon1"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="w-40 border-red-500 bg-blue-500">
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
