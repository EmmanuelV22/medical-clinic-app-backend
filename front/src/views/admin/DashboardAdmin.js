import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import CardAllPatients from "../../components/admin/CardAllPatients";
import CardAllEmployees from "../../components/admin/CardAllEmployees";
import CardRegister from "../../components/admin/CardRegister";
import CardAllAppointments from "../../components/admin/CardAllAppointments";
import { Context } from "../../store/appContext";

const DashboardAdmin = () => {
  const { store } = useContext(Context);

  return (
    <>
      {store?.employee && store.employee?.specialist === "admin" ? (
        <>
          <Navbar />
          <div className="d-flex justify-content-evenly flex-wrap my-5">
            <CardAllPatients />
            <CardAllEmployees />
            <CardRegister />
            <CardAllAppointments />
          </div>
        </>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </>
  );
};

export default DashboardAdmin;
