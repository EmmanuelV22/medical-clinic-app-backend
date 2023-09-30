const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 5000;
const cors = "cors";
const dotenv = require("dotenv").config();

connectDB();

app.use(express.json());

app.use("/api/auth", require("./auth/route"));

//Lancer le serveur
app.listen(port, () => {
  console.log("Server OK on port: ", port);
});
