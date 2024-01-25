import React, { useContext } from "react";
import { Context } from "../../store/appContext";

import Navbar from "../../components/Navbar";
import CardMyPatients from "../../components/employees/CardMyPatients";
import CardAllPatients from "../../components/employees/CardAllPatients";
import CardAppointments from "../../components/employees/CardAppointements";
import CardMap from "../../components/CardMap";
import AccessDenied from "../AccessDenied";

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
          <h1>
            {store.employee?.sex === "h" ? "Bienvenido" : "Bienvenida"}{" "}
            {store.employee?.firstname} {store.employee?.lastname}
          </h1>
          <div className="d-flex justify-content-evenly flex-wrap ">
            <CardMyPatients />
            <CardAllPatients />
            <CardAppointments />
            <CardMap />
          </div>
        </>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default DashboardDoctor;
