/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../../store/appContext";

const PasswordChange = () => {
  const { actions } = useContext(Context);
  const { dni } = useParams();
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password.length > 7) {
      try {
        const response = await actions.saveNewPassword(dni, password, token);

        return response;
      } catch (error) {
        console.log(
          "Error intentando cambiar contraseña, Acceso denegado: parametros incorrectos",
          error
        );
      }
    } else {
      actions.showNotification("Denegado: Valores incorrectos", "danger");
    }
  };

  return (
    <div className="text-center d-flex align-items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded m-auto px-8 pt-6 pb-8  mb-4"
      >
        <div>
          <img
            src="../../../clinic-logo-removebg.png"
            alt="logo app clinic"
            className="homeHover m-2"
            style={{ width: "12rem" }}
            onClick={() => navigate("/")}
          />
        </div>
        <h1>Cambia tu contraseña aqui!</h1>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password === "" ? (
          <p className="text-red-500 text-xs italic text-danger">
            Por favor ingrese una contraseña con almenos 8 caracteres para
            continuar.
          </p>
        ) : (
          <></>
        )}

        <div className="mx-auto">
          <button className="button1 w-75 m-3 text-black">
            Cambiar Contraseña
          </button>
          <button
            className="button3 w-75 m-3 text-black"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
