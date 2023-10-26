const jwt = require("jsonwebtoken");
const jwtSecret =
  "0ea83a262f8efb25346b0cd612af54572067b23c4942bd11d57b1a9f7c97912a7fd432";

exports.private = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err || !decodedToken) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      next();
    }
  });
};

///////////////////////////////////////////

// exports.userAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" });
//       } else {
//         if (!decodedToken.isPatient) {
//           return res.status(401).json({ message: "Not authorized" });
//         } else {
//           next();
//         }
//       }
//     });
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" });
//   }
// };

// //////////////////////////////////////////////////////////

// exports.staffAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" });
//       } else {
//         if (!decodedToken.isDoctor) {
//           return res.status(401).json({ message: "Not authorized" });
//         } else {
//           next();
//         }
//       }
//     });
//   } else {
//     res.status(401).json({ message: "Not authorized, token not available" });
//   }
// };
