import React, { useContext } from "react";
import { Context } from "../store/appContext";

const DashboardAdmin = () => {
  const { store, actions } = useContext(Context);
  return (
    <div>
      <h1>admin</h1>
    </div>
  );
};

export default DashboardAdmin;
