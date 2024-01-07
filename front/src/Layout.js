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
import AccessDenied from "../src/views/AccessDenied";

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

import AppointmentById from "./views/patients/AppointmentById";

import PatientHistory from "./views/employees/PatientHistory";
import MyTtreatments from "./views/patients/MyTtreatments";
import PasswordChange from "./views/patients/PasswordChange";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  return (
    <BrowserRouter basename={basename}>
      <Routes>

        {/*RUTAS PUBLICAS */}
        <Route path="/acceso-denegado" element={<AccessDenied />} />
        <Route path="/" element={<Home />} />

       



        {/*RUTAS PRIVADAS */}
        <Route path="/appointment-post" element={<SpecialistPicker />} />
        <Route path="/history/:id" element={<HistoryByPatient />} />
        <Route path="/patient-history/:id" element={<PatientHistory />} />
        <Route
          path="/patient-treatments/:patient_id"
          element={<PatientTreatements />}
        />
        <Route path="/patients/update-password/:dni/:token" element={<PasswordChange />}/>
          
        {/*RUTAS ADMINS */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/empleados" element={<AdminAllEmployees />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />

        {/*RUTAS DOCTORES */}
        <Route path="/dashboard-doctor" element={<DashboardDoctor />}></Route>
        <Route path="/mis-pacientes" element={<MyPatients />} />
        <Route path="/patients/:id" element={<PatientData />} />
        <Route path="/new-treatment" element={<CreateTreatment />} />
        <Route path="/create-history/:id" element={<CreateHistoric />} />
        <Route
          path="/editTreatment/:treatment_id"
          element={<EditTreatment />}
        />
        <Route
          path="/createTreatment/patient/:patient_id"
          element={<CreateTreatment />}
        />

        {/*RUTAS EMPLEADO */}
        <Route path="/pacientes" element={<AdminAllPatients />} />
        <Route path="/mis-turnos" element={<MyAppointments />} />

        {/*RUTAS PACIENTES */}
        <Route path="/dashboard-patient" element={<DashboardPatient />} />
        <Route
          path="/patient-appointment/:appointment_id"
          element={<AppointmentById />}
        />
        <Route path="/mi-tratamiento/:patient_id" element={<MyTtreatments />} />
        <Route
          path="/patient-treatment/:treatment_id"
          element={<TreatmentById />}
        />
        <Route
          path="/notifications/:patient_id"
          element={<MyNotifications />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
