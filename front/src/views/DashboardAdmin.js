import React, { useContext } from "react";
import { Context } from "../store/appContext";

const DashboardAdmin = () => {
  const { store } = useContext(Context);

  return (
    <div>
      {store.employees.length > 0 &&
        store.employees?.specialist &&
        store.employees.specialist === "admin" && <h1>Hola Admin</h1>}
    </div>
  );
};

export default DashboardAdmin;
