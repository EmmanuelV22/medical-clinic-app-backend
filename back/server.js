const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 5000;
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth, staffAuth } = require("./middleware/auth");

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

// Configuration de l'application
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", require("./auth/route"));

// Routes
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/patient", userAuth, (req, res) => res.send("Patient Route"));
app.get("/staff", staffAuth, (req, res) => res.send("Staff Route"));

// Lancement du serveur
app.listen(port, () => {
  console.log("Server OK on port: ", port);
});
