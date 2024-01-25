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
import CardMap from "../../components/CardMap";
import AccessDenied from "../AccessDenied";

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
          <h1>
            {store.patientData?.patientData?.sex.toUpperCase() === "H"
              ? "Bienvenido"
              : "Bienvenida"}{" "}
            {store.patientData?.patientData?.firstname}{" "}
            {store.patientData?.patientData?.lastname}
          </h1>
          <div className="d-flex justify-content-evenly flex-wrap ">
            {store.patient && (
              <>
                <CardAppointment />
                <CardGetAppointment />
                <CardTreatments />
                <CardMyHistory />
                <CardSettings />
                <CardMap />
              </>
            )}
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default DashboardPatient;
