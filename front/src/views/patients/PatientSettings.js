/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router";
import DoctorInfo from "../../components/DoctorInfo ";

const PatientSettings = () => {
  const { actions, store } = useContext(Context);
  const { patient_id } = useParams();
  let navigate = useNavigate();


  const handleGetTreatments = async () => {
    patient_id && (await actions.getTreatmentsPatient(patient_id));
    console.log(store.patientData.treatments);
  };



  useEffect(() => {
    handleGetTreatments();
  }, [patient_id]);

  

  return (
    <>
      <h1>Ajustes del paciente</h1>
    </>
  );
};

export default PatientSettings;
