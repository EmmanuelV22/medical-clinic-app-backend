/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import CardAppointment from "../../components/patients/CardAppointment";
import { Context } from "../../store/appContext";
import CardTreatments from "../../components/patients/CardTreatments";
import CardMyHistory from "../../components/patients/CardMyHistory";
import CardSettings from "../../components/patients/CardSettings";

import CardGetAppointment from "../../components/patients/CardGetAppointments";

const DashboardPatient = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPatientById(store.patient.id);
  }, [store.patient]);

  return (
    <>
      {store?.patient && store.patient?.id ? (
        <>
          <Navbar />
          <h1>Bienvenido {store.patientData?.patientData?.firstname}  {store.patientData?.patientData?.lastname}</h1>
          <div className="d-flex">
            {store.patient && (
              <>
                <CardAppointment />
                <CardGetAppointment />
                <CardTreatments />
                <CardMyHistory />
                <CardSettings />
              </>
            )}
          </div>
        </>
      ) : (
        <h2>componente denegado</h2>
      )}
    </>
  );
};

export default DashboardPatient;
