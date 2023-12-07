const express = require("express");
const {
  getAppointmentPatients,
  getMedicalAppointments,
  createAppointment,
  deleteAppointment,
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

router
  .route("/appointments-patient/:patient_id")
  .get(private, getAppointmentPatients);
router
  .route("/appointments-medical/:medical_id")
  .get(private, getMedicalAppointments);
router.route("/create-appointment/:id").post(private, createAppointment);
router.route("/delete-appointment/:id").delete(private, deleteAppointment);
// router.route("/confirm-agenda/:id").put(ConfirmationAgendaById);

// router.route("/history").get(getHistoryPatient);
// router.route("/history/:id").get(getHistoryPatientById);
// router.route("/create-history").post(createHistory);

router
  .route("/treatments/patient/:patient_id")
  .get(private, getTreatmentsPatient);
router
  .route("/treatments/medical/:medical_id")
  .get(private, getTreatmentsMedical);
router.route("/treatment/:id").get(private, getTreatmentById);
router.route("/create-treatment").post(createTreatment);
router.route("/update-treatment/:id").put(privateDr, updateTreatment);

module.exports = router;
