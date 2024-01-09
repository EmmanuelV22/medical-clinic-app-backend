/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import DoctorInfo from "./DoctorInfo ";

const PatientTreatement = () => {
  const { actions, store } = useContext(Context);

  const { patient_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (patient_id) {
      handleGetTreatments();
    }
  }, [patient_id]);

  const handleGetTreatments = async () => {
    patient_id && (await actions.getTreatmentsPatient(patient_id));
    patient_id && (await actions.getPatientById(patient_id));
  };

  const getDoctorData = async (id) => {
    const doctorData = await actions.getEmployeeById(id);
    return doctorData;
  };

  return (
    <>
      <h1>
        Lista de Tratamientos de {store.patientData?.patientData?.firstname}{" "}
        {store.patientData?.patientData?.lastname}
      </h1>
      <table>
        <thead>
          <tr>
            <th>Resumen</th>
            <th>Fecha de inicio</th>
            <th>Fecha de finalización</th>
            <th>Patologías</th>
            <th>Doctor</th>
            <th>Terminado</th>
            <th>Actualizado</th>
            <th>Editable</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {store.patientData.treatments &&
          store.employee.id &&
          store.employee.specialist !== "admin" ? (
            store.patientData.treatments.map((treatment, index) => (
              <tr key={index}>
                <td>{treatment.resume}</td>
                <td>{actions.dateFormater(treatment.initial_date)}</td>
                <td>{actions.dateFormater(treatment.exp_date)}</td>
                <td>{treatment.surgey === "" ? "NO" : treatment.surgey}</td>
                <td>
                  {patient_id && (
                    <DoctorInfo
                      medicalId={treatment.medical_id}
                      getDoctorData={getDoctorData}
                    />
                  )}
                </td>
                <td>{treatment.finish_treatment ? "SI" : "NO"}</td>
                <td>
                  {treatment.updatedAt !== null
                    ? actions.dateFormater(treatment.updatedAt)
                    : "NO"}
                </td>
                <td>
                  {treatment.finish_treatment ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-pencil-x"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ff2825"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                      <path d="M22 22l-5 -5" />
                      <path d="M17 22l5 -5" />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => navigate(`/editTreatment/${treatment.id}`)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-pencil"
                      width="44"
                      height="44"
                      cursor="pointer"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                    </svg>
                  )}
                </td>
                <td>
                  {" "}
                  <svg
                    onClick={() =>
                      navigate(`/patient-treatment/${treatment.id}`)
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-eye"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ff2825"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cursor="pointer"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                  </svg>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">¡No estás autorizado!</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PatientTreatement;
