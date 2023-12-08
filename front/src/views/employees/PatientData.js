/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { Context } from "../../store/appContext";

const PatientData = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

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
          <button
          className="btn btn-success"
          onClick={()=>handlePatientTreatments(id)}
          ></button>
        </div>
      )}
    </>
  );
};

export default PatientData;
