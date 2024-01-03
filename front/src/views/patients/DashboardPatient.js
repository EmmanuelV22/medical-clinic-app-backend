/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import CardAppointment from "../../components/patients/CardAppointment";
import { Context } from "../../store/appContext";
import CardTreatments from "../../components/patients/CardTreatments";

const DashboardPatient = () => {
  const { store } = useContext(Context);

  return (
    <>
      <Navbar />
      <div className="d-flex">
        {store.patient && (
          <>
            <CardAppointment />
            <CardTreatments />
          </>
        )}
      </div>
    </>
  );
};

export default DashboardPatient;
