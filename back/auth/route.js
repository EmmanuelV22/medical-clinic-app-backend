const express = require("express");
const { register, login, update, deleteUser, getAllUsers } = require("./auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update);
router.route("/delete").delete(deleteUser);
router.route("/users").get(getAllUsers);

module.exports = router;
