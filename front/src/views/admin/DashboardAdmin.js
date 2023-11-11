/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import CardAllUsers from "../../components/admin/CardAllUsers";

const DashboardAdmin = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <CardAllUsers />
    </div>
  );
};

export default DashboardAdmin;
