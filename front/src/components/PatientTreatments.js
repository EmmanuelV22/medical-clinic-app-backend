/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const PatientTreatement = () => {
  const { actions, store } = useContext(Context);

  const { patient_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetTreatments();
  }, [patient_id]);

  const handleGetTreatments = async () => {
    patient_id && (await actions.getTreatmentsPatient(patient_id));
    patient_id && (await actions.getPatientById(patient_id));
    console.log("Console log from patientTreatements", store.patientData);
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
            <th>Medicina</th>
            <th>Cantidad</th>
            <th>Fecha de inicio</th>
            <th>Fecha de finalización</th>
            <th>Patologías</th>
            <th>Cirugía</th>
            <th>Doctor</th>
            <th>Terminado</th>
            <th>Actualizado</th>
            <th>Editable</th>
          </tr>
        </thead>
        <tbody>
          {store.patientData.treatments ? (
            store.patientData.treatments.map((treatment, index) => (
              <tr key={index}>
                <td>{treatment.resume}</td>
                <td>{treatment.medicine}</td>
                <td>{treatment.quantity}</td>
                <td>{actions.dateFormater(treatment.initial_date)}</td>
                <td>{actions.dateFormater(treatment.exp_date)}</td>
                <td>{treatment.patologies}</td>
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
                      class="icon icon-tabler icon-tabler-pencil-x"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ff2825"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      class="icon icon-tabler icon-tabler-pencil"
                      width="44"
                      height="44"
                      cursor="pointer"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                    </svg>
                  )}
                </td>
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

const DoctorInfo = ({ medicalId, getDoctorData }) => {
  const [doctorData, setDoctorData] = useState(null);
  const { store } = useContext(Context);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const data = await getDoctorData(medicalId);
      console.log("CONSOLE DE DATA", data);
      setDoctorData(data);
    };

    fetchDoctorData();
  }, [medicalId]);

  return doctorData ? (
    <span>{`${doctorData.firstname} ${doctorData.lastname}`}</span>
  ) : (
    <span>Cargando datos del doctor...</span>
  );
};

export default PatientTreatement;
