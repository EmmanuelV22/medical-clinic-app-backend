/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Notifications from "./Notifications";
import NotificationsNavbar from "./patients/NotificationsNavbar";
import NotificationAppointment from "./employees/NotificationAppointment";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [homeType, setHomeType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [darkHome, setDarkHome] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  let navigate = useNavigate();
  function logout() {
    actions.logout();
    navigate("/");
  }

  useEffect(() => {
    if (store?.patient?.id) {
      setHomeType("patient");
    }
    if (store?.employee?.specialist === "admin") {
      setHomeType("admin");
    }
    if (store?.employee?.specialist === "nurse") {
      setHomeType("nurse");
    }
    if (
      store?.employee?.specialist !== "admin" &&
      store?.employee?.specialist !== "nurse" &&
      !store.patient.id
    ) {
      setHomeType("doctor");
    }
  }, [store.patient, store.employee]);

  return (
    <nav className="navbar navbar-expand-md m-0 p-0">
      <div className="container-fluid ">
        <div className="d-flex align-items-center">
          <img
            src="../../clinic-logo-removebg.png"
            alt="logo app clinic"
            className="homeHover m-2"
            style={{ width: "8rem" }}
            onClick={() => navigate("/")}
          />
          {store.employee.specialist !== "admin" && (
            <div className="">
              {store.patient.id && (
                <div className=" ">
                  <div
                    className="nav-item mt-3 m-3 dropdown-toggle "
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <Notifications />
                    <NotificationsNavbar />
                  </div>
                </div>
              )}
              {store.employee.id &&
                !["enfermero", "enfermera"].includes(
                  store.employee.specialist
                ) && (
                  <div className="">
                    <div
                      className="nav-item mt-3 m-3 dropdown-toggle "
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <Notifications />
                      <NotificationAppointment />
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          style={
            isOpen
              ? {
                  top: "85px",
                  right: "20px",
                  marginRight: "05px",
                }
              : {}
          }
          className="collapse navbar-collapse position-absolute  end-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              onClick={() => navigate(`/dashboard-${homeType}`)}
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-home homeHover m-2 ms-2 mt-3"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={darkHome ? "#fbfdfd" : "#000000"}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
            </li>
            <li className="nav-item m-2 mt-4">
              <DarkMode onDarkModeToggle={setDarkHome} />
            </li>
            <div style={{ marginTop: "11px" }}>
              <button onClick={logout} className="Btn m-2 bg-danger">
                <div className="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="text" style={{ paddingTop: "4px" }}>
                  Salir
                </div>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
