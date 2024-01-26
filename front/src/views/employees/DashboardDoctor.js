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
          <div className="mt-4">
            <h1 className="text-center">
              {store.employee?.sex === "h" ? "Bienvenido" : "Bienvenida"}{" "}
              {store.employee?.firstname} {store.employee?.lastname}
            </h1>
            <div className="content-cards d-flex justify-content-evenly px-4 mt-4 flex-wrap gap-4 mb-5">
              <CardMyPatients />
              <CardAllPatients />
              <CardAppointments />
              <CardMap />
            </div>
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
