import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Login from "../components/Login";
import LoginPatient from "../components/LoginPatient";
import { useNavigate } from "react-router";

const Home = () => {
  const { actions } = useContext(Context);
  const [loginType, setLoginType] = useState("Medical");
  const navigate = useNavigate();

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  function logout() {
    actions.logout();
    alert("logout OK");
    window.location.reload();
    navigate("/");
  }

  return (
    <>
      <div className="logo d-flex justify-center">
        <img src="../clinic-logo-removebg.png" alt="logo app clinic" />
      </div>
      <div className="mx-auto">
        <div className="d-flex flex-col">
          <div className="mx-auto my-5">
            <label>
              <input
                type="radio"
                value="Medical"
                checked={loginType === "Medical"}
                onChange={handleLoginTypeChange}
              />
              Medical
            </label>
            <label>
              <input
                type="radio"
                value="Patient"
                checked={loginType === "Patient"}
                onChange={handleLoginTypeChange}
              />
              Patient
            </label>
          </div>
          {loginType === "Medical" ? <Login /> : <LoginPatient />}
        </div>
      </div>

      <button className="bg-danger" onClick={logout}>
        LOGOUT
      </button>
    </>
  );
};

export default Home;
