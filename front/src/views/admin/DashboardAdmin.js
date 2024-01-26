import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import CardAllPatients from "../../components/admin/CardAllPatients";
import CardAllEmployees from "../../components/admin/CardAllEmployees";
import CardRegister from "../../components/admin/CardRegister";

import CardAllAppointments from "../../components/admin/CardAllAppointments";
import { Context } from "../../store/appContext";

import CardMap from "../../components/CardMap";

import AccessDenied from "../AccessDenied";

const DashboardAdmin = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {store?.employee && store.employee?.specialist === "admin" ? (
        <>
          <Navbar />
          <div className="mt-4">
            <h1 className="text-center pb-4">
              {store.employee?.sex === "H" ? "Bienvenido" : "Bienvenida"}{" "}
              {store.employee?.firstname} {store.employee?.lastname}
            </h1>
            <div className="content-cards d-flex justify-content-evenly px-4 mt-4 flex-wrap gap-4">
              <CardAllPatients />
              <CardAllEmployees />
              <CardRegister />
              <CardAllAppointments />
              <CardMap />
            </div>
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default DashboardAdmin;
