const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const { Pool } = require("pg");
const { connectToDB } = require("./models");

const app = express();
const port = 5000; // Usar el puerto definido en el entorno o 5000 por defecto
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { private } = require("./middleware/auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

connectToDB(pool);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
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


const resp = async () => {
  try {
    const result = await pool.query("SELECT * FROM clinic.employees");
    if (result){
      console.log("SUCCCESSSS",result.rows)
    }
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
  }
};

// Invoca la función para ejecutar la consulta
resp();

module.exports = pool;
console.log("pool exportado correctamente");
