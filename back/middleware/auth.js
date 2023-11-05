const jwt = require("jsonwebtoken");
const jwtSecret =
  "0ea83a262f8efb25346b0cd612af54572067b23c4942bd11d57b1a9f7c97912a7fd432";

exports.private = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
