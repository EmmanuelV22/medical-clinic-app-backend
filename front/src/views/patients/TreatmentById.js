/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router";
import DoctorInfo from "../../components/DoctorInfo ";
import Navbar from "../../components/Navbar";

const TreatmentById = () => {
  const { store, actions } = useContext(Context);
  const { treatment_id } = useParams();

  const getTreatmentByNotif = async () => {
    await actions.getTreatmentById(treatment_id);
  };

  const getDoctorData = async (id) => {
    const doctorData = await actions.getEmployeeById(id);
    return doctorData;
  };

  const getPatientData = async (id) => {
    const patientData = await actions.getPatientById(id);
    return patientData;
  };

  useEffect(() => {
    getTreatmentByNotif();
    getPatientData(store.treatment.patient_id);
  }, [store.treatment.patient_id]);

  return (
    <div>
      <Navbar />
      <div className="text-center d-flex justify-content-center row">
        <h1>Detalles del tratamiento:</h1>
        <h5>Paciente:</h5>
        <p>
          {store.patientData.patientData?.firstname +
            "  " +
            store.patientData.patientData?.lastname}
        </p>
        <h5>DNI:</h5>
        <p>{store.patientData.patientData?.dni}</p>
        <h5>Resumen:</h5>
        <p>{store.treatment.resume}</p>
        <h5>Medicina:</h5>
        <span>
          {store.treatment.medicine_data &&
            JSON.parse(store.treatment.medicine_data).map(
              (medicine, medIndex) => (
                <div  key={medIndex}>
                  <div >
                    <svg 
                      className="m-1"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                      
                    >
                      <path d="M441 7l32 32 32 32c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15L417.9 128l55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-72-72L295 73c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l55 55L422.1 56 407 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM210.3 155.7l61.1-61.1c.3 .3 .6 .7 1 1l16 16 56 56 56 56 16 16c.3 .3 .6 .6 1 1l-191 191c-10.5 10.5-24.7 16.4-39.6 16.4H97.9L41 505c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l57-57V325.3c0-14.9 5.9-29.1 16.4-39.6l43.3-43.3 57 57c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-57-57 41.4-41.4 57 57c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-57-57z" />
                    </svg>
                    {medicine.medicine_name}
                  </div>
                  <div className="mb-5">Cantidad: {medicine.quantity}</div>
                </div>
              )
            )}
        </span>
        <h5>Fecha de inicio:</h5>
        <p>
          {store.treatment.initial_date &&
            actions.dateFormater(store.treatment.initial_date)}
        </p>
        <h5>Fecha de finalizacion:</h5>
        <p>
          {store.treatment.exp_date
            ? actions.dateFormater(store.treatment.exp_date)
            : "NO"}
        </p>
        <h5>Patologias:</h5>
        <p>{store.treatment.patologies}</p>
        <h5>Es Cirugia:</h5>
        <p>{store.treatment.surgey}</p>
        <h5>Doctor:</h5>
        <DoctorInfo
          medicalId={store.treatment.medical_id}
          getDoctorData={getDoctorData}
        />
        <h5>Terminado:</h5>
        <p>{store.treatment.finish_treatment ? "SI" : "NO"}</p>
        <h5 >Actualizado:</h5>
        <p className="mb-5">
          {store.treatment.updatedAt
            ? actions.dateFormater(store.treatment.updatedAt)
            : "NO"}
        </p>
      </div>
    </div>
  );
};

export default TreatmentById;
