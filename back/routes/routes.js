const express = require("express");
const {
  getAgendaPatient,
  createAgenda,
  deleteAgenda,
} = require("../controller/agenda.controller");
const { createHistory } = require("../controller/history.controller");
const router = express.Router();

router.route("/agenda").get(getAgendaPatient);
router.route("/create-agenda").post(createAgenda);
router.route("/delete-agenda").delete(deleteAgenda);

router.route("/create-history").post(createHistory);

module.exports = router;
