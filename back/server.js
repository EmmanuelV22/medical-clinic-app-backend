const express = require("express");
const dotenv = require("dotenv");
// const bcrypt = require('bcryptjs');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectToDB } = require("./models");
const { Pool } = require('pg');


dotenv.config();

const app = express();
const port = 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

connectToDB(pool);

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use("/api/auth", require("./auth/route"));
app.use("/api", require("./routes/routes"));
app.listen(port, () => {
  console.log("Server OK on port: ", port);
});

module.exports = { pool };
