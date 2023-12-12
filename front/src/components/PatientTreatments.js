/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const PatientTreatement = () => {
  const { actions, store } = useContext(Context);

  const { patient_id } = useParams();

  useEffect(() => {
    handleGetTreatments();
  }, [patient_id]);

  const handleGetTreatments = async () => {
    patient_id && (await actions.getTreatmentsPatient(patient_id));
  };

  return (
    <>
      <h1>Lista de Tratamientos de </h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Resumen</th>
            <th>Medicina</th>
            <th>Cantidad</th>
            <th>Fecha de inicio</th>
            <th>Fecha de finalización</th>
            <th>Patologías</th>
            <th>Cirugía</th>
            <th>Doctor</th>
            <th>Terminado</th>
            <th>Actualizado</th>
          </tr>
        </thead>
        <tbody>
          {store.patientData.treatments ? (
            store.patientData.treatments.map((treatment, index) => (
              <tr key={index}>
                <td>{treatment.id}</td>
                <td>{treatment.resume}</td>
                <td>{treatment.medicine}</td>
                <td>{treatment.quantity}</td>
                <td>{treatment.initial_date}</td>
                <td>{treatment.exp_date}</td>
                <td>{treatment.patologies}</td>
                <td>{treatment.surgey}</td>
                <td>{treatment.medical}</td>
                <td>{treatment.finish_treatment ? "Sí" : "No"}</td>
                <td>{treatment.updated_at}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">Cargando tratamientos...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PatientTreatement;
