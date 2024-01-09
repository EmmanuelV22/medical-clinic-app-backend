/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import CardAppointment from "../../components/patients/CardAppointment";
import { Context } from "../../store/appContext";
import CardTreatments from "../../components/patients/CardTreatments";
import CardGetAppointment from "../../components/patients/CardGetAppointments";

const DashboardPatient = () => {
  const { store } = useContext(Context);

  return (
    <>
      {store?.patient && store.patient?.id ? (
        <>
          <Navbar />
          <div className="d-flex">
            {store.patient && (
              <>
                <CardAppointment />
                <CardGetAppointment />
                <CardTreatments />
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
