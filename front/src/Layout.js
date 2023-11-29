import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import injectContext from "./store/appContext";
import Register from "./components/Register";
import DashboardAdmin from "./views/admin/DashboardAdmin";
import DashboardPatient from "./views/patients/DashboardPatient";
import DashboardDoctor from "./views/employees/DashboardDoctor";
import AdminAllPatients from "./views/admin/AdminAllPatients";
import AdminAllEmployees from "./views/admin/AdminAllEmployees";
import EmployeeDetail from "./components/admin/EmployeeDetail";
import SpecialistPicker from "./components/SpecialistPicker";

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
        <Route path="/pacientes" element={<AdminAllPatients />}></Route>
        <Route path="/empleados" element={<AdminAllEmployees />}></Route>
        <Route path="/employees/:id" element={<EmployeeDetail />}></Route>
        <Route path="/appointment-post" element={<SpecialistPicker />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
