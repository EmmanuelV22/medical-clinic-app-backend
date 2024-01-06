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
  updatePasswordPatient,
  deletePatient,
  getPatientById,
  getEmployeeById,
  registerPatient,
  sendMailChangePassword,
  validateTokenPatient
} = require("./auth");

const {
  privateAdmin,
  private,
  privateEmployees,
  privatePatient,
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
router.route("/patients/update-password/:dni/:token").put(validateTokenPatient,updatePasswordPatient);
router.route("/patients/send-mail/:dni").get(sendMailChangePassword);


module.exports = router;
