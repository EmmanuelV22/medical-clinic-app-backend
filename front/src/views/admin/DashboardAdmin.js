import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import Navbar from "../../components/Navbar";
import CardAllPatients from "../../components/admin/CardAllPatients";
import CardAllEmployees from "../../components/admin/CardAllEmployees";
import CardRegister from "../../components/admin/CardRegister";

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
          </div>
        </>
      ) : (
        <h1>Espacio resevado a los administradores!</h1>
      )}
    </>
  );
};

export default DashboardAdmin;
