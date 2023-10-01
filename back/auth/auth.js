const User = require("../models/user.model"); // Importamos el modelo de usuario desde el archivo user.model.js ubicado en el directorio '../models'.
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "0ea83a262f8efb25346b0cd612af54572067b23c4942bd11d57b1a9f7c97912a7fd432";

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Récupérer tous les utilisateurs
    res.status(200).json(users); // Envoyer les utilisateurs en réponse
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
};

////////////////////////////////////////////////////////////

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: user._id,
            username,
            email,
            role: user.role,
          },
          jwtSecret,
          {
            expiresIn: maxAge,
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res
          .status(201)
          .json({ message: "User successfully created", user: user._id });
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ message: "Login not successful", error: "User not found" });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            {
              id: user._id,
              email,
              role: user.role,
            },
            jwtSecret,
            {
              expiresIn: maxAge,
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });
          res
            .status(201)
            .json({ message: "User successfully Logged in", user: user._id });
        } else {
          res.status(400).json({ message: "Login not successful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////////

exports.update = async (req, res, next) => {
  const { role, id } = req.body;

  // Verifying if role and id are present
  if (!role || !id) {
    return res.status(400).json({ message: "Role or Id not present" });
  }

  // Verifying if the value of role is admin
  if (role !== "admin") {
    return res.status(400).json({ message: "Role is not admin" });
  }

  try {
    // Find the user with the given id
    const user = await User.findById(id);

    // Check if the user is not already an admin
    if (user.role !== "admin") {
      user.role = role;
      await user.save();
      return res.status(201).json({ message: "Update successful", user });
    } else {
      return res.status(400).json({ message: "User is already an Admin" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
};

//////////////////////////////////////////////////////////////////////

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.deleteOne())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
