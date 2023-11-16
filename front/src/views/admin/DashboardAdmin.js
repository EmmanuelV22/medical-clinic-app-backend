/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import CardAllUsers from "../../components/admin/CardAllUsers";
import Navbar from "../../components/Navbar";

const DashboardAdmin = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <Navbar />
      <CardAllUsers />
    </div>
  );
};

export default DashboardAdmin;
