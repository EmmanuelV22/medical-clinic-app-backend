const express = require("express");
const {
  getAppointmentPatients,
  getMedicalAppointments,
  createAppointment,
  deleteAppointment,
  ConfirmationAgendaById,
} = require("../controller/agenda.controller");

// const { createHistory } = require("../controller/history.controller");

const {
  createTreatment,
  updateTreatment,
  getTreatmentsPatient,
  getTreatmentsMedical,
  getTreatmentById,
} = require("../controller/treatment.controller");

const router = express.Router();
const { privateEmployees, privateDr, private } = require("../middleware/auth");
const {
  getHistoryByPatient,
  getHistories,
  createHistory,
} = require("../controller/history.controller");

/////////////////turnos rutas////////////////////
router
  .route("/appointments-patient/:patient_id")
  .get(private, getAppointmentPatients);
router
  .route("/appointments-medical/:medical_id")
  .get(private, getMedicalAppointments);
router.route("/create-appointment/:id").post(private, createAppointment);
router.route("/delete-appointment/:id").delete(private, deleteAppointment);
router
  .route("/confirm-agenda/:appointmentId")
  .put(privateEmployees, ConfirmationAgendaById);

/////////////////historial clinica rutas////////////////////
router.route("/history").get(private, getHistories);
router.route("/history/:id").get(private, getHistoryByPatient);

router.route("/create-history/:id").post(privateDr, createHistory);


/////////////////tratamientos rutas////////////////////
router
  .route("/treatments/patient/:patient_id")
  .get(private, getTreatmentsPatient);
router
  .route("/treatments/medical/:medical_id")
  .get(private, getTreatmentsMedical);
router.route("/treatment/:id").get(private, getTreatmentById);
router.route("/create-treatment").post(privateDr, createTreatment);
router.route("/update-treatment/:id").put(privateDr, updateTreatment);

module.exports = router;
