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

const {
  privateAdmin,
  private,
  privateEmployees,
} = require("../middleware/auth");
const router = express.Router();

//////////////EMPLOYEES ROUTES///////////
router.route("/register").post(privateAdmin, register);
router.route("/login").post(login);
router.route("/update/:id").put(privateAdmin, update);
router.route("/delete/:id").delete(privateAdmin, deleteUser);
router.route("/employees").get(private, getAllEmployees);
router.route("/employees/:id").get(private, getEmployeeById);

//////////////PATIENS ROUTES///////////
router.route("/register-patient").post(privateAdmin, registerPatient);
router.route("/login-patient").post(loginPatient);
router.route("/update-patient/:id").put(privateAdmin, updatePatient);
router.route("/delete-patient/:id").delete(privateAdmin, deletePatient);
router.route("/patients").get(privateEmployees, getAllPatients);
router.route("/patients/:id").get(private, getPatientById);

module.exports = router;
