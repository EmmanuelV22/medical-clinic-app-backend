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

import CreateTreatment from "./views/employees/CreateTreatment";
import PatientTreatements from "./components/PatientTreatments";

import MyPatients from "./views/employees/MyPatients";
import MyAppointments from "./views/employees/MyAppointments";
import PatientData from "./views/employees/PatientData";
import HistoryByPatient from "./components/HistoryByPatient";

import EditTreatment from "./views/employees/EditTreatment";

import CreateHistoric from "./components/employees/CreateHistoric";
import MyNotifications from "./components/patients/MyNotifications";
import TreatmentById from "./views/patients/TreatmentById";

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
        <Route path="/patients/:id" element={<PatientData />}></Route>
        <Route path="/mis-pacientes" element={<MyPatients />}></Route>
        <Route path="/mis-turnos" element={<MyAppointments />}></Route>
        <Route path="/empleados" element={<AdminAllEmployees />}></Route>
        <Route path="/employees/:id" element={<EmployeeDetail />}></Route>
        <Route path="/appointment-post" element={<SpecialistPicker />}></Route>
        <Route path="/new-treatment" element={<CreateTreatment />}></Route>
        <Route path="/history/:id" element={<HistoryByPatient />}></Route>
        <Route path="/create-history/:id" element={<CreateHistoric />}></Route>
        <Route
          path="/notifications/:patient_id"
          element={<MyNotifications />}
        ></Route>
        <Route
          path="/patient-treatments/:patient_id"
          element={<PatientTreatements />}
        ></Route>
        <Route
          path="/patient-treatment/:treatment_id"
          element={<TreatmentById />}
        ></Route>
        <Route
          path="/createTreatment/patient/:patient_id"
          element={<CreateTreatment />}
        ></Route>
        <Route
          path="/editTreatment/:treatment_id"
          element={<EditTreatment />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
