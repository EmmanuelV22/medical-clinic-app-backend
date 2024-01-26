/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import HistoryByPatient from "../../components/HistoryByPatient";
import CreateHistoric from "../../components/employees/CreateHistoric";
import AccessDenied from "../../views/AccessDenied";
import Navbar from "../../components/Navbar";



const PatientData = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [createHistoric, setCreateHistoric] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const isCreating = () => {
    setCreateHistoric(true);
  };

  const isNotCreating = () => {
    setCreateHistoric(false);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handlePatientTreatments = async () => {
    try {
      const PatientTreatements = await actions.getTreatmentsPatient(id);
      // Naviguer vers la route des détails du patient avec l'ID
      navigate(`/patient-treatments/${id}`);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
    }
  };

  const getPatientData = async () => {
    try {
      const patientDetails = await actions.getPatientById(id);
      // Si vous avez besoin de faire quelque chose avec les détails du patient, vous pouvez le faire ici
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
      // Gérer l'erreur ici, peut-être rediriger vers une page d'erreur
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  };

  useEffect(() => {
    getPatientData();
  }, [id]);

  return (
    <>
    <Navbar />
      {store?.employee &&
      store.employee?.specialist !== "admin" &&
      store.patientData &&
      store.patientData.patientData ? (
        <div className="d-flex justify-content-center text-center row" key={store.patientData.patientData.id}>
          <h2 className="text-center">
            Ficha personal de {store.patientData.patientData.firstname}{" "}
            {store.patientData.patientData.lastname}
          </h2>
          <div>{createHistoric && <CreateHistoric id={id} />}</div>
          {!createHistoric ? (
            <button className="btn button1 w-50 mb-3 text-black" onClick={isCreating}>
              Crear nueva historia
            </button>
          ) : (
            <button className=" button3 w-50 mb-3 text-black" onClick={isNotCreating}>
              Cancelar
            </button>
          )}
          <button
            className="btn button1 w-50 mx-3 mb-3 text-black"
            onClick={() => handlePatientTreatments(id)}
          >
            Ver tratamientos
          </button>
          <button
            className="btn button1 w-50 mb-3 text-black"
            onClick={() => navigate(`/createTreatment/patient/${id}`)}
          >
            Crear tratamiento
          </button>
          <p>
            Sexo: <span>{store.patientData.patientData.sex.toUpperCase() === 'H' ? "Masculino" : "Femenino"}</span>{" "}
          </p>
          <p>
            Telefono: <span>{store.patientData.patientData.phone}</span>{" "}
          </p>
          <p>
            Fecha de nacimiento:{" "}
            <span>
              {actions.dateFormater(store.patientData.patientData.birthday)}
            </span>{" "}
          </p>
          <p>
            Edad:
            <span>{calcularEdad(store.patientData.patientData.birthday)}</span>
          </p>
          <p>
            DNI: <span>{store.patientData.patientData.dni}</span>{" "}
          </p>
          <p>
            Dirección: <span>{store.patientData.patientData.address}</span>{" "}
          </p>
          <p>
            Grupo sanguíneo:{" "}
            <span>
              {store.patientData.patientData.blood_group.toUpperCase()}
            </span>{" "}
          </p>
          <div className=" rounded mb-5">
            <h3>Historia Clinica: </h3>
            <button onClick={handleShow} className="btn button1 w-50 mb-3 text-black">
              {show ? "Ocultar" : "Ver"}
            </button>
            {show && <HistoryByPatient />}
          </div>


        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default PatientData;
