import React , { useContext } from "react";
import { Context } from "../../store/appContext";
import CreateTreatment from "./CreateTreatment";

const DashboardDoctor = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {
        store.employee?.specialist &&
        store.employee.specialist !== "admin" ? <CreateTreatment /> : <div>
        <h1>Acceso Denegado</h1>
      </div> }
        
      
    </div>
  );
};

export default DashboardDoctor;
