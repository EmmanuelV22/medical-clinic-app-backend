import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Register from "../components/Register"

const DashboardAdmin = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {
        store.employees?.specialist &&
        store.employees.specialist === "admin" ? <>
        <h1>Hola Admin</h1>
        <Register />
        </>
        :
        <div>
          <h1>Acceso Denegado</h1>
        </div>
        }
        
    </div>
  );
};

export default DashboardAdmin;
