const express = require("express");
const {
  getAgendaPatient,
  createAgenda,
  deleteAgenda,
} = require("../controller/agenda.controller");
const { createHistory } = require("../controller/history.controller");
const { createTreatment, updateTreatment } = require("../controller/treatment.controller");
const router = express.Router();

router.route("/agenda").get(getAgendaPatient);
router.route("/create-agenda").post(createAgenda);
router.route("/delete-agenda").delete(deleteAgenda);

router.route("/create-history").post(createHistory);
router.route("/create-treatment").post(createTreatment)
router.route("/update-treatment").put(updateTreatment)


module.exports = router;
