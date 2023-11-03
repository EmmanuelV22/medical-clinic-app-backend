import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import injectContext from "./store/appContext";
import Register from "./components/Register";
import DashboardAdmin from "./views/DashboardAdmin";
import DashboardPatient from "./views/DashboardPatient";
import DashboardDoctor from "./views/DashboardDoctor";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard-admin" element={<DashboardAdmin />}></Route>
        <Route path="/dashboard-patient" element={<DashboardPatient />}></Route>
        <Route path="/dashboard-doctor" element={<DashboardDoctor />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
