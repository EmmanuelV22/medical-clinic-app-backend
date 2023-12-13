/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

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

  useEffect(() => {
    fetchPatientData();
  }, [id]);
  return (
    <div>
      {store.patientData &&
        store.patientData?.history &&
        store.patientData.history.map((e) => (
          <div key={e.id}>
            <p>
              descripción:
              <span>{e.description}</span>
            </p>
            <p>
              fecha:
              <span>{actions.dateFormater(e.date)}</span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default HistoryByPatient;
