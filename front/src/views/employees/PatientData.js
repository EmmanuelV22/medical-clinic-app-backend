/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import HistoryByPatient from "../../components/HistoryByPatient";
import CreateHistoric from "../../components/employees/CreateHistoric";
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
      {store.patientData && store.patientData.patientData && (
        <div key={store.patientData.patientData.id}>
          <h2>
            Ficha personal de {store.patientData.patientData.firstname}{" "}
            {store.patientData.patientData.lastname}
          </h2>
          <div>{createHistoric && <CreateHistoric id={id} />}</div>
          {!createHistoric ? (
            <button className="btn btn-danger" onClick={isCreating}>
              Crear nueva historia
            </button>
          ) : (
            <button className="btn btn-danger" onClick={isNotCreating}>
              Cancelar
            </button>
          )}
          <button
            className="btn btn-success"
            onClick={() => handlePatientTreatments(id)}
          >
            Ver tratamientos
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/createTreatment/patient/${id}`)}
          >
            Crear tratamiento
          </button>
          <p>
            email: <span>{store.patientData.patientData.email}</span>{" "}
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
          <div className="border border-dark rounded">
            <h3>Historia Clinica: </h3>
            <button onClick={handleShow} className="btn btn-secondary">
              {show ? "Ocultar" : "Ver"}
            </button>
            {show && <HistoryByPatient />}
          </div>
        </div>
      )}
    </>
  );
};

export default PatientData;
