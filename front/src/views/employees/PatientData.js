/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import HistoryByPatient from "../../components/patients/HistoryByPatient";

const PatientData = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

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
          <p>
            email: <span>{store.patientData.patientData.email}</span>{" "}
          </p>
          <p>
            Fecha de nacimiento:{" "}
            <span>{store.patientData.patientData.birthday}</span>{" "}
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
          <div>
            <HistoryByPatient />
          </div>
          <button
            className="btn btn-success"
            onClick={() => handlePatientTreatments(id)}
          >
            Ver tratamiento
          </button>
        </div>
      )}
    </>
  );
};

export default PatientData;
