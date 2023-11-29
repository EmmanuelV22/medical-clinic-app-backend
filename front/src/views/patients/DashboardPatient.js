/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import Navbar from "../../components/Navbar";
import CardAppointment from "../../components/patients/CardAppointment";

const DashboardPatient = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllPatients();
  }, []); // Assurez-vous que votre useEffect dépend de ce qui est nécessaire, sinon supprimez le tableau de dépendances []

  return (
    <div>
      <Navbar />
      <CardAppointment />
    </div>
  );
};

export default DashboardPatient;
