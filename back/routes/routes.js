const express = require("express");
const {
  getAppointmentPatients,
  getMedicalAppointments,
  createAppointment,
  deleteAppointment,
  ConfirmationAgendaById,
  getAppointmentById,
  changeAppointment,
  getAppointmenByIdPatient,
  getAllAppointment,
} = require("../controller/agenda.controller");

// const { createHistory } = require("../controller/history.controller");

const {
  createTreatment,
  updateTreatment,
  getTreatmentsPatient,
  getTreatmentsMedical,
  getTreatmentById,
  getTreatments,
} = require("../controller/treatment.controller");

const router = express.Router();

const {
  privateEmployees,
  privateDr,
  private,
  privatePatient,
} = require("../middleware/auth");

const {
  getHistoryByPatient,
  getHistories,
  createHistory,
} = require("../controller/history.controller");

const {
  getNotifications,
  getNotificationsById,
  stateNotifications,
  deleteNotifications,
  getNotificationsByIdForEmployee,
} = require("../controller/notifications.controller");

///////////////////Notificaciones rutas ///////////////////////////////
router.route("/notifications").get(private, getNotifications);
router
  .route("/notifications/:patient_id")
  .get(privatePatient, getNotificationsById);
router
  .route("/notifications-employee/:medical_id")
  .get(privateDr, getNotificationsByIdForEmployee);

router
  .route("/notifications-state/:notificationsId")
  .put(private, stateNotifications);

router
  .route("/notifications/delete/:id")
  .delete(private, deleteNotifications);

/////////////////turnos rutas////////////////////
router.route("/appointments").get(privateEmployees, getAllAppointment);
router
  .route("/appointments-patient/:patient_id")
  .get(private, getAppointmentPatients);
router
  .route("/appointment-id-patient/:patient_id")
  .get(private, getAppointmenByIdPatient);
router.route("/appointment-patient/:id").get(private, getAppointmentById);
router
  .route("/appointments-medical/:medical_id")
  .get(private, getMedicalAppointments);
router.route("/create-appointment/:id").post(private, createAppointment);
router.route("/delete-appointment/:id").delete(private, deleteAppointment);
router
  .route("/confirm-agenda/:appointmentId")
  .put(privateEmployees, ConfirmationAgendaById);
router.route("/change-appointment/:id").put(private, changeAppointment);

/////////////////historial clinica rutas////////////////////
router.route("/history").get(private, getHistories);
router.route("/history/:id").get(private, getHistoryByPatient);

router.route("/create-history/:id").post(privateDr, createHistory);

/////////////////tratamientos rutas////////////////////
router.route("/treatments").get(private, getTreatments);
router
  .route("/treatments/patient/:patient_id")
  .get(private, getTreatmentsPatient);
router
  .route("/treatments/medical/:medical_id")
  .get(private, getTreatmentsMedical);
router.route("/treatment/:id").get(private, getTreatmentById);
router.route("/create-treatment").post(private, createTreatment);
router.route("/update-treatment/:id").put(privateDr, updateTreatment);

module.exports = router;
