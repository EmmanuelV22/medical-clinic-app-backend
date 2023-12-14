const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

/////////// RUTA PRIVADA ADMIN //////////////
exports.privateAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      if (user.specialist !== "admin") {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//////////////// RUTA PRIVADA PACIENTE ////////////////
exports.privatePatient = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      if (user.specialist) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

////////////////RUTA PRIVADA MEDICOS///////////////
exports.privateDr = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      if (
        user.specialist === "admin" &&
        user.specialist === "enfermero" &&
        user.specialist === "enfermera" &&
        user.blood_group
      ) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//////////// RUTA PRIVADA ENFERMERA ///////////
exports.privateNurse = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      if (user.specialist !== "enfermero" && user.specialist !== "enfermera") {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//////////// RUTA PRIVADA //////////////////
exports.private = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
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

///////////// RUTA PRIVADA EMPLEADOS //////////
exports.privateEmployees = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      if (!user.specialist) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
