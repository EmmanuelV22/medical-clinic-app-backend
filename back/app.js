const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use("/api/signup", require("./routes/signup.js"));
// app.use("/api/login", require("./routes/login.js"));
// app.use("/api/logout", require("./routes/logout.js"));
// app.use("/api/todos", require("./routes/todos.js"));
// app.use("/api/refresh-token", require("./routes/refreshToken.js"));
// app.use("/api/user", require("./routes/user.js"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server on port:" + port);
});
