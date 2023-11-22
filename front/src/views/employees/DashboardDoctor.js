import React , { useContext } from "react";
import { Context } from "../../store/appContext";

const DashboardDoctor = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {
        store.employees?.specialist &&
        store.employees.specialist !== "admin" ? <h1>doc dash</h1> : <div>
        <h1>Acceso Denegado</h1>
      </div> }
        
      
    </div>
  );
};

export default DashboardDoctor;
