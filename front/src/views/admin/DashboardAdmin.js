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
    <>
      {store?.employee && store.employee?.specialist === "admin" ? (
        <>
          <Navbar />
          <h1>
            {store.employee?.sex === "H" ? "Bienvenido" : "Bienvenida"}{" "}
            {store.employee?.firstname} {store.employee?.lastname}
          </h1>
          <div className="d-flex justify-content-evenly flex-wrap ">
            <CardAllPatients />
            <CardAllEmployees />
            <CardRegister />
            <CardAllAppointments />
            <CardMap />
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default DashboardAdmin;
