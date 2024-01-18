import React, { useContext } from "react";
import { Context } from "../../store/appContext";

import Navbar from "../../components/Navbar";
import CardMyPatients from "../../components/employees/CardMyPatients";
import CardAllPatients from "../../components/employees/CardAllPatients";
import CardAppointments from "../../components/employees/CardAppointements";
import CardMap from "../../components/CardMap";

const DashboardDoctor = () => {
  const { store } = useContext(Context);

  return (
    <>
      {store.employee &&
      store.employee?.specialist &&
      store.employee?.specialist !== "admin" &&
      store.employee?.specialist !== "enfermero" &&
      store.employee?.specialist !== "enfermera" ? (
        <>
          <Navbar />
          <div className="d-flex justify-content-evenly flex-wrap my-5">
            <CardMyPatients />
            <CardAllPatients />
            <CardAppointments />
            <CardMap />
          </div>
        </>
      ) : (
        <div>
          <h1>Acceso Denegado</h1>
        </div>
      )}
    </>
  );
};

export default DashboardDoctor;
