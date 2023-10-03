const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 5000;
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth, staffAuth } = require("./middleware/auth");

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", require("./auth/route"));

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("Admin Route"));
app.get("/staff", staffAuth, (req, res) => res.send("Admin Route"));

//Lancer le serveur
app.listen(port, () => {
  console.log("Server OK on port: ", port);
});
