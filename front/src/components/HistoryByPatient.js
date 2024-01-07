/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";
import DoctorInfo from "./DoctorInfo ";

const HistoryByPatient = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  const fetchPatientData = async () => {
    try {
      const historyResponse = await actions.getHistoryPatientById(id);
      console.log(historyResponse);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du patient : ",
        error
      );
    }
  };

  const getDoctorData = async (id) => {
    const doctorData = await actions.getEmployeeById(id);
    return doctorData;
  };

  useEffect(() => {
    if (id) {
      fetchPatientData();
    }
  }, [id]);

  return (
    <div>
      {store.patientData && store.patientData.history?.length > 0 ? (
        store.patientData?.history.map((e) => (
          <div className="border border-dark " key={e.id}>
            <p>
              descripción:
              <span>{e.description}</span>
            </p>
            <p>
              fecha:
              <span>{actions.dateFormater(e.date)}</span>
            </p>
            <p>
              Escrito por :
              <span>
                {" "}
                <DoctorInfo
                  medicalId={e.medical_id}
                  getDoctorData={getDoctorData}
                />
              </span>
            </p>
          </div>
        ))
      ) : (
        <div>
          <h3> No datos ingresados de historial</h3>
        </div>
      )}
    </div>
  );
};

export default HistoryByPatient;
