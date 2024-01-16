import React, { useContext } from "react";
import { Context } from "../../store/appContext";

import Navbar from "../../components/Navbar";
import CardAllPatients from "../../components/employees/CardAllPatients";

const DashboardEnfermero = () => {
  const { store } = useContext(Context);
  

 
  return (
    <>
      {
        store.employee?.specialist &&
        ["enfermero", "enfermera"].includes(store.employee.specialist) ? (
        <>
          <Navbar />
          <div className="d-flex justify-content-evenly flex-wrap my-5">
            <CardAllPatients />
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

export default DashboardEnfermero;
