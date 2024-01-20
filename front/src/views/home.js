import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Login from "../components/Login";
import LoginPatient from "../components/LoginPatient";
import { useNavigate } from "react-router";

const Home = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  function logout() {
    actions.logout();
    navigate("/");
  }

  return (
    <>
      <div className="logo text-center mx-auto">
        <img src="../clinic-logo-removebg.png" alt="logo app clinic" />
      </div>
      <div className="container my-5 text-center">
        <ul
          className="nav nav-tabs menu-review mx-auto text-center w-75"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item nav-review w-50" role="presentation">
            <button
              className="nav-link active w-100"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              PACIENTE
            </button>
          </li>
          <li className="nav-item nav-review w-50" role="presentation">
            <button
              className="nav-link w-100"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              EMPLEADO
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <LoginPatient />
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <Login />
          </div>
        </div>
      </div>

      <button className="bg-danger" onClick={logout}>
        LOGOUT
      </button>
    </>
  );
};

export default Home;
