/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../../store/appContext";

const HistoryByPatient = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  const fetchPatientData = async () => {
    try {
      // Supposons que vous avez une fonction dans 'actions' qui récupère les données du patient
      const patientData = await actions.getPatientById(id);
      console.log(patientData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du patient : ",
        error
      );
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [id]);
  return <div></div>;
};

export default HistoryByPatient;
