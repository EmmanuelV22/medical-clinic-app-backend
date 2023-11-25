const express = require("express");
const {
  getAgendaPatient,
  getMedicalAgenda,
  createAgenda,
  deleteAgenda,
  ConfirmationAgendaById
} = require("../controller/agenda.controller");
// const { createHistory } = require("../controller/history.controller");
// const { createTreatment, updateTreatment } = require("../controller/treatment.controller");
const router = express.Router();
// const { private } = require("./middleware/auth");


router.route("/agenda-patient/:patient_id").get(getAgendaPatient);
router.route("/agenda-medical/:medical_id").get(getMedicalAgenda);
router.route("/create-agenda").post(createAgenda);
router.route("/delete-agenda/:id").delete(deleteAgenda);
router.route("/confirm-agenda/:id").put(ConfirmationAgendaById);

// router.route("/history").get(getHistoryPatient);
// router.route("/history/:id").get(getHistoryPatientById);
// router.route("/create-history").post(createHistory);

// router.route("/treatment").get(getTreatment);
// router.route("/treatment/:id").get(getTreatmentById);
// router.route("/create-treatment").post(createTreatment)
// router.route("/update-treatment").put(updateTreatment)


module.exports = router;
