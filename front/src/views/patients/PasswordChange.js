/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../../store/appContext";

const PasswordChange = () => {
  const { actions, store } = useContext(Context);
  const { dni } = useParams();
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await actions.saveNewPassword(dni, password, token);

      if (response.status === 201) {
        return alert(response.message);
      } else {
        return alert(response.message);
      }
    } catch (error) {
      alert(
        "Error intentando cambiar contraseña, Acceso denegado: parametros incorrectos"
      );
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setPassword("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
          <p className="text-red-500 text-xs italic">
            Por favor ingrese la contraseña para continuar.
          </p>
        ) : (
          <></>
        )}

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cambiar Contraseña
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={handleClear}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordChange;
