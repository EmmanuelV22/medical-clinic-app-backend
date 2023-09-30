const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    await User.create({
      username,
      email,
      password,
    }).then((user) =>
      res.status(200).json({ message: "User created successfully", user })
    );
  } catch (error) {
    res
      .status(401)
      .json({ message: "User not created successfully", error: error.message });
  }
};
