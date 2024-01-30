const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 5000; // Usar el puerto definido en el entorno o 5000 por defecto
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { private } = require("./middleware/auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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
  console.log("Connected to database");
  checkAndCreateDefaultEmployee();

});

function checkAndCreateDefaultEmployee() {
  const query = "SELECT COUNT(*) AS total FROM employees";
  connectDB.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error checking employees count:", error);
      return;
    }

    const totalEmployees = results[0].total;
    if (totalEmployees === 0) {
      createDefaultAdmin();
    }else{
      console.log("All ok: Default admin allready exist")
    }
  });
}

function createDefaultAdmin() {
const password = "admin"
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hasheando password" });
    }
  const createdAt = new Date().toISOString().split("T")[0];

  const defaultAdmin = {
    firstname: "admin",
    lastname: "admin",
    phone: 11111111,
    sex: "H",
    email: "admin@admin.com",
    address: "admin 123",
    birthday: "2024/01/01",
    dni: "789456123",
    specialist: "admin",
    personalID: "admin",
    days_off: "[0,0]",
    createdAt: createdAt,
    start_time : 9,
    end_time: 17,
    password: hash
    };

  const query = "INSERT INTO employees SET ?";
  connectDB.query(query, defaultAdmin, (error, results, fields) => {
    if (error) {
      console.error("Error creating default admin:", error);
      return;
    }
    console.log("Default admin created successfully");
  });});
}

module.exports = connectDB;

app.use(express.json());
app.use(cors({
  origin: '*' // Permitir solicitudes de cualquier origen
}));
app.use(cookieParser());
app.use("/api/auth", require("./auth/route"));
app.use("/api", require("./routes/routes"));

app.get("/api/private", private, (req, res) =>
  res.json({
    user: req.user,
  })
);

app.listen(port, () => {
  console.log("Server OK on port: ", port);
});
