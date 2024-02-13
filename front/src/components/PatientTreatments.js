/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import DoctorInfo from "./DoctorInfo ";
import AccessDenied from "../../src/views/AccessDenied";
import Navbar from "./Navbar";

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
      <Navbar />
      <div className={store.patientData.treatments?.length < 5 && ""}>
        <h1 className="text-center">
          Lista de Tratamientos de {store.patientData?.patientData?.firstname}{" "}
          {store.patientData?.patientData?.lastname}
        </h1>
        <table className="table table-user table-sm-size table-treatment mb-5">
          <thead>
            <tr>
              <th className="">Resumen</th>
              <th className="table-initiate">Fecha de inicio</th>
              <th className="table-date">Fecha de finalización</th>
              <th className="table-surgey">Cirugia</th>
              <th className="">Doctor</th>
              <th className="table-surgey">Terminado</th>
              <th className="table-surgey">Actualizado</th>
              {!["enfermero", "enfermera"].includes(
                store.employee.specialist
              ) && <th>Editable</th>}
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {store.patientData.treatments &&
            (store.employee.id || store.patient.id) &&
            store.employee.specialist !== "admin" ? (
              store.patientData.treatments.map((treatment, index) => (
                <tr key={index}>
                  <td className="">
                    {treatment.resume.length > 20
                      ? `${treatment.resume.substring(0, 20)}...`
                      : treatment.resume}
                  </td>
                  <td className="table-initiate">
                    {actions.dateFormater(treatment.initial_date)}
                  </td>
                  <td className="table-date">
                    {actions.dateFormater(treatment.exp_date)}
                  </td>
                  <td className="table-surgey">
                    {treatment.surgey === "" ? "NO" : treatment.surgey}
                  </td>
                  <td className="">
                    {patient_id && (
                      <DoctorInfo
                        medicalId={treatment.medical_id}
                        getDoctorData={getDoctorData}
                      />
                    )}
                  </td>
                  <td className="table-surgey">
                    {treatment.finish_treatment ? "SI" : "NO"}
                  </td>
                  <td className="table-surgey">
                    {treatment.updated_at !== null
                      ? actions.dateFormater(treatment.updated_at)
                      : "NO"}
                  </td>
                  {!["enfermero", "enfermera"].includes(
                    store.employee.specialist
                  ) && (
                    <td className="icon-treatment">
                      {treatment.finish_treatment ||
                      store.employee.id !== treatment.medical_id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-pencil-x"
                          width="28"
                          height="28"
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
                          onClick={() =>
                            navigate(`/editTreatment/${treatment.id}`)
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-pencil"
                          width="28"
                          height="28"
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
                  )}
                  <td className="icon-treatment">
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
                <AccessDenied />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientTreatement;
