/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

const PatientData = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
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

    getPatientData();
  }, [id]);

  return (
    <>
      {store.patientData && store.patientData.patientData && (
        <div key={store.patientData.patientData.id}>
          <h2>Ficha personal de {store.patientData.patientData.firstname}</h2>
        </div>
      )}
    </>
  );
};

export default PatientData;
