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

const { private } = require("../middleware/auth");
const router = express.Router();

//////////////EMPLOYEES ROUTES///////////
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(private, update);
router.route("/delete").delete(deleteUser);
router.route("/employees").get(private, getAllEmployees);
router.route("/employees/:id").get(private, getEmployeeById);

//////////////PATIENS ROUTES///////////
router.route("/register-patient").post(private, registerPatient);
router.route("/login-patient").post(loginPatient);
router.route("/update-patient").put(private, updatePatient);
router.route("/delete-patient/:id").delete(private, deletePatient);
router.route("/patients").get(private, getAllPatients);
router.route("/patients/:id").get(private, getPatientById);

module.exports = router;
