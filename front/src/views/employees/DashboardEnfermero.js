import React, { useContext } from "react";
import { Context } from "../../store/appContext";

import Navbar from "../../components/Navbar";
import CardAllPatients from "../../components/employees/CardAllPatients";
import AccessDenied from "../AccessDenied";
import CardMap from "../../components/CardMap";

const DashboardEnfermero = () => {
  const { store } = useContext(Context);

  return (
    <>
      {store.employee?.specialist &&
      ["enfermero", "enfermera"].includes(store.employee.specialist) ? (
        <>
          <Navbar />
          <h1 className="text-center">
            {store.employee?.sex === "m" ? "Bienvenido" : "Bienvenida"}{" "}
            {store.employee?.firstname} {store.employee?.lastname}
          </h1>
          <div className="content-cards d-flex justify-content-evenly px-4 mt-4 flex-wrap gap-4 mb-5">
            <CardAllPatients />
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

export default DashboardEnfermero;
