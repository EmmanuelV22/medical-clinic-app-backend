const express = require("express");
const {
  register,
  login,
  update,
  deleteUser,
  getAllEmployees,
  getAllPatients,
  loginPatient,
  updatePatient,
  deletePatient,
  getPatientById,
  getEmployeeById,
  registerPatient,
} = require("./auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update);
router.route("/delete").delete(deleteUser);
router.route("/employees").get(getAllEmployees);
router.route("/employees/:id").get(getEmployeeById);

//////////////PATIENS ROUTES///////////
router.route("/register-patient").post(registerPatient);
router.route("/login-patient").post(loginPatient);
router.route("/update-patient").put(updatePatient);
router.route("/delete-patient").delete(deletePatient);
router.route("/patients").get(getAllPatients);
router.route("/patients/:id").get(getPatientById);

module.exports = router;
