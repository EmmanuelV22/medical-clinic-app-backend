const express = require("express");
const {
  getAppointmentPatients,
  getMedicalAppointments,
  createAppointment ,
  deleteAppointment,
  // ConfirmationAgendaById
} = require("../controller/agenda.controller");


// const { createHistory } = require("../controller/history.controller");


// const { createTreatment, updateTreatment, getTreatmentsPatient,
//   getTreatmentsMedical,getTreatmentById } = require("../controller/treatment.controller");


const router = express.Router();
// const { private } = require("./middleware/auth");


router.route("/appointments-patient/:patient_id").get(getAppointmentPatients);
router.route("/appointments-medical/:medical_id").get(getMedicalAppointments);
router.route("/create-appointment").post(createAppointment);
router.route("/delete-appointment/:id").delete(deleteAppointment);
// router.route("/confirm-agenda/:id").put(ConfirmationAgendaById);

// router.route("/history").get(getHistoryPatient);
// router.route("/history/:id").get(getHistoryPatientById);
// router.route("/create-history").post(createHistory);

// router.route("/treatments/patient/:patient_id").get(getTreatmentsPatient); 
// router.route("/treatments/medical/:medical_id").get(getTreatmentsMedical);
// router.route("/treatment/:id").get(getTreatmentById);
// router.route("/create-treatment").post(createTreatment)
// router.route("/update-treatment/:id").put(updateTreatment)

module.exports = router;
