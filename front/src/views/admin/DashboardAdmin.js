import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import Navbar from "../../components/Navbar";
import CardAllPatients from "../../components/admin/CardAllPatients";
import CardAllEmployees from "../../components/admin/CardAllEmployees";

const DashboardAdmin = () => {
  const { store } = useContext(Context);

  return (
    <>
      {store?.employee && store.employee.specialist === "admin" ? (
        <div>
          <Navbar />
          <CardAllPatients />
          <CardAllEmployees />
        </div>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </>
  );
};

export default DashboardAdmin;
