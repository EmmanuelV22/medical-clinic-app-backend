/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import Navbar from "../../components/Navbar";
import CardAppointment from "../../components/patients/CardAppointment";

const DashboardPatient = () => {
  const { actions } = useContext(Context);


  return (
    <div>
      <Navbar />
      <CardAppointment />
    </div>
  );
};

export default DashboardPatient;
