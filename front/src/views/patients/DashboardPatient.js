/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import CardAppointment from "../../components/patients/CardAppointment";
import { Context } from "../../store/appContext";
import Notifications from "../../components/Notifications";

const DashboardPatient = () => {
  const { store } = useContext(Context);
  return (
    <div>
      {store.patient && (
        <>
          <Navbar />
          <CardAppointment />
          <Notifications />
        </>
      )}
    </div>
  );
};

export default DashboardPatient;
