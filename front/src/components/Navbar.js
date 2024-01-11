/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Notifications from "./Notifications";
import NotificationsNavbar from "./patients/NotificationsNavbar";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  function logout() {
    actions.logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid">
        <img
          src="../clinic-logo-removebg.png"
          alt="logo app clinic"
          style={{ width: "5rem" }}
          onClick={() => navigate("/")}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Panel
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <Link to="/" onClick={logout} className="bg-danger nav-link">
                cerrar sessión
              </Link>
            </li>
            {store.employee && store.employee.specialist !== "admin" && (
              <li
                className="nav-item dropdown nav-link"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Notifications />
                <NotificationsNavbar />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
