const express = require("express");
const { register, login, update, deleteUser } = require("./auth");
const { adminAuth } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/delete").delete(adminAuth, deleteUser);

module.exports = router;
