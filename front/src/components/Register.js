/* eslint-disable no-unreachable */
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

const Register = () => {
  const { actions } = useContext(Context);
  let navigate = useNavigate();

  function logout() {
    actions.logout();
    navigate("/");
  }

  return (
    <>
      <h1>register</h1>
      <button onClick={logout} className="btn btn-danger">
        logout
      </button>
    </>
  );
};

export default Register;
