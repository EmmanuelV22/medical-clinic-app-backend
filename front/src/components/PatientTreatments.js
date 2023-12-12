/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import SortingTable from "./SortingTable";

const PatientTreatement = () => {
  const { actions, store } = useContext(Context);
  let navigate = useNavigate();

  const { patient_id } = useParams();

  useEffect(() => {
    handleGetTreatments();
  }, [patient_id]);

  const handleGetTreatments = async () => {
    patient_id && (await actions.getTreatmentsPatient(patient_id));
    patient_id && (await actions.getPatientById(patient_id));
    console.log("CONSOLEEEE", store.patientData);
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
                <td>{treatment.updatedAt !== null
            ? actions.dateFormater(treatment.updatedAt)
            : "NO"}</td>
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
  const {store} = useContext(Context)
  

  useEffect(() => {
    const fetchDoctorData = async () => {
      const data = await getDoctorData(medicalId);
      console.log("CONSOLE DE DATA",data)
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
