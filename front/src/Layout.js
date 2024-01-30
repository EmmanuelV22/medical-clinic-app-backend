import React, { useEffect, useState } from "react";
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
import clinic from "./clinic-logo-removebg.png";

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
import Alerts from "./components/Alerts";
import PatientAppointments from "./views/patients/PatientAppointments";

import PatientModal from "./components/patients/PatientModal";

import DashboardEnfermero from "./views/employees/DashboardEnfermero";

import AllAppointments from "./views/AllAppointments";

import MapView from "./views/MapView";
import Footer from "./components/Footer";
import AboutUs from "./views/AboutUs";
import ScrollToTopOnMount from "./ScrollToTopOnMount";

import { FloatingWhatsApp } from "react-floating-whatsapp";

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const basename = process.env.BASENAME || "";
  return (
    <div>
      <BrowserRouter basename={basename}>
        <Alerts />
        <ScrollToTopOnMount />
        <Routes>
          {/*RUTAS PUBLICAS */}
          <Route path="/acceso-denegado" element={<AccessDenied />} />
          <Route path="/" element={<Home />} />
          <Route path="clinic/aboutUs" element={<AboutUs />} />

          {/*RUTAS PRIVADAS */}
          <Route path="/planificar-turno" element={<SpecialistPicker />} />
          <Route path="/history/:id" element={<HistoryByPatient />} />
          <Route path="/patient-history/:id" element={<PatientHistory />} />
          <Route
            path="/patient-treatments/:patient_id"
            element={<PatientTreatements />}
          />
          <Route
            path="/patients/update-password/:dni/:token"
            element={<PasswordChange />}
          />
          <Route path="/clinc/maps" element={<MapView />} />

          {/*RUTAS ADMINS */}
          <Route
            path="/planificar-turno/:patient_id_params"
            element={<SpecialistPicker />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/empleados" element={<AdminAllEmployees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />

          {/*RUTAS DOCTORES */}
          <Route path="/dashboard-doctor" element={<DashboardDoctor />}></Route>
          <Route
            path="/dashboard-nurse"
            element={<DashboardEnfermero />}
          ></Route>
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
          <Route path="/turnos" element={<AllAppointments />} />

          {/*RUTAS PACIENTES */}
          <Route path="/patient/update/:id" element={<PatientModal />}></Route>
          <Route path="/dashboard-patient" element={<DashboardPatient />} />
          <Route
            path="/patient-appointment/:appointment_id"
            element={<AppointmentById />}
          />
          <Route
            path="/turnos-paciente/:patient_id"
            element={<PatientAppointments />}
          />
          <Route
            path="/mi-tratamiento/:patient_id"
            element={<MyTtreatments />}
          />
          <Route
            path="/patient-treatment/:treatment_id"
            element={<TreatmentById />}
          />
          <Route
            path="/notifications/:patient_id"
            element={<MyNotifications />}
          />
        </Routes>
        <Footer />
        <FloatingWhatsApp
          phoneNumber="+54 11 23278365"
          accountName="Clinic'App"
          chatMessage="Bienvenido/a a Clinic'App! Cómo podemos ayudarte?"
          placeholder="Envia tu mensaje para ir a Whatsapp"
          messageDelay={0}
          statusMessage="Responde en menos de 5 minutos"
          darkMode={isDarkMode}
          buttonStyle={{ position: "fixed", bottom: "4rem", right: "20px" }}
          avatar={clinic}
          style={{ height: "auto", width: "auto" }}
          allowEsc
          allowClickAway
          notification
          notificationSound
        />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
