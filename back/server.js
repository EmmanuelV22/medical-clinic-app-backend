const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const { connectToDB } = require("./models");
const app = express();
const port = process.env.DB_API_PORT || 5000;
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

app.get("/", (req, res) =>
  res.send("Successfull conected to api")
);

app.listen(port, () => {
  console.log("Server OK on port: ", port);
});

module.exports = pool;















