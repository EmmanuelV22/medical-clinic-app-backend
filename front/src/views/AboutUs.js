import React, { useContext } from "react";
import clinic from "../../src/clinic-logo-removebg.png";
import Navbar from "../components/Navbar"
import { Context } from "../store/appContext";

const AboutUs = () => {
const {store} = useContext(Context)

  return (<>
  {store.patient.id || store.employee.id ? <Navbar /> : null}
    <div className=" container-fluid pt-2 pb-5" style={{ minHeight: "100vh" }}>
      <br />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          
        }}
      >
        Quienes somos?
      </h1>

      <p
        className="m-5 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <h5 style={{display:"inline"}}>Clinic'app</h5> es una app web desarrollada para facilitar las
        conexiones y gestion de informacion entre los pacientes y el personal
        medico de la clinica.<br></br> Su sistema se basa en lenguaje HTML + CSS
        + React combinando con una rest API basada en NodeJS de Javascript y una
        base de datos MySQL.<br></br>
        <br></br>
        <h5>Proporciona herramientas para el paciente tales como:</h5>
        <br></br>-Programacion y gestion de citas medicas
        <br></br>-Lectura de historia clinica
        <br></br>-Seguimiento de tratamientos
        <br></br>-Ubicacion via google maps
        <br></br>-Notificaciones y cambio de contraseña via mail
        <br></br>
        <br></br>
        <h5>Del lado del profesional de la salud cuenta con:</h5>
        <br></br>-Gestion de pacientes
        <br></br>-Gestion de citas medicas propias
        <br></br>-Creacion y modificacion de tratamientos
        <br></br>-Registros en la historia clinica del paciente
        <br></br>
        <br></br>
        <h5>El administrador puede:</h5>
        <br></br>-Crear nuevos usuarios
        <br></br>-Editar informacion de usuarios
        <br></br>-Reservar turno a pacientes
        <br></br>-Consultar listados de usuarios y de citas medicas
      </p>

      <br />
      <h1
        className="pb-3"
        style={{
          display: "flex",
          justifyContent: "center",
          
        }}
      >
        Quienes desarrollaron la app?
      </h1>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-3 mb-4">
            <div className="card  ">
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
                    <span className="text-muted  text-center">
                      https://github.com/EmmanuelV22
                    </span>
                  </p>
                </a>
              </div>
            </div>
          </div>

          <div className="col col-md-3 mb-4">
            <div className="card   ">
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
    </>
  );
};

export default AboutUs;
