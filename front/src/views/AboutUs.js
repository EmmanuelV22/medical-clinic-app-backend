import React from "react";
import clinic from "../../src/clinic-logo-removebg.png";

const AboutUs = () => {
  return (
    <div
      className="bg-black text-white container-fluid pt-2 pb-5"
      style={{ minHeight: "100vh" }}
    >
      <br />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontStyle: "italic",
          fontFamily: "Helvetica",
        }}
      >
        About us
      </h1>

      <p className="m-5" style={{ display: "flex", justifyContent: "center" }}>
        Clinic'app es una app web desarrollada para facilitar las conexiones y
        gestion de informacion entre los pacientes y el personal medico de la
        clinica.<br></br> Su sistema se basa en lenguaje HTML + CSS + React
        combinando con una rest API basada en NodeJS de Javascript y una base de
        datos MySQL.<br></br> Proporciona herramientas para el paciente tales
        como:
        <br></br>-Programacion y gestion citas medicas
        <br></br>-Visibilidad de historia clinica
        <br></br>-Seguimiento de tratamientos
        <br></br>-Ubicacion via google maps
        <br></br>
        Del lado del profesional de la salud cuenta con:
        <br></br>-Gestion de pacientes
        <br></br>-Gestion de citas medicas propias
        <br></br>-Creacion y modificacion de tratamientos
        <br></br>-Registros en la historia clinica del paciente
      </p>

      <br />
      <h1
        className="pb-3"
        style={{
          display: "flex",
          justifyContent: "center",
          fontStyle: "italic",
          fontFamily: "Helvetica",
        }}
      >
        Quienes desarrollaron la app?
      </h1>

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <div className="card bg-black text-white  ">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div
                  className="rounded-circle overflow-hidden"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <img
                    src={clinic}
                    className="w-100 h-100"
                    alt="Emmanuel Vargas"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title text-center">Emmanuel Vargas</h5>
                <p className="card-text text-center">From Uruguay </p>
                <p className="card-text text-center">Full Stack Developer</p>
                <a
                  className="text-muted"
                  href="https://github.com/EmmanuelV22"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="card-text text-center">
                    <span className="text-muted text-white text-center">
                      https://github.com/EmmanuelV22
                    </span>
                  </p>
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="card bg-black text-white  ">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div
                  className="rounded-circle overflow-hidden"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <img
                    src={clinic}
                    className="w-100 h-100"
                    alt="Valentin Robert"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title text-center">Valentin Robert</h5>
                <p className="card-text text-center">From Argentina </p>
                <p className="card-text text-center">Full Stack Developer</p>
                <a
                  className="text-muted"
                  href="https://github.com/ValentinFrAr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="card-text text-center">
                    <span className="text-muted text-center">
                      https://github.com/ValentinFrAr
                    </span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
