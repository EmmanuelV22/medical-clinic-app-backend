const express = require("express");
const dotenv = require("dotenv").config();
const mysql = require("mysql");
const app = express();
const port = 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { private } = require("./middleware/auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Connexion à la base de données
const connectDB = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connectDB.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connectDB;

// Configuration de l'application
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", require("./auth/route")); // Ruta para la autenticación
app.use("/api", require("./routes/routes")); // Rutas personalizadas

// Ruta privada con /api
app.get("/api/private", private, (req, res) =>
  res.json({
    user: req.user,
  })
);

// Lancement du serveur
app.listen(port, () => {
  console.log("Server OK on port: ", port);
});
