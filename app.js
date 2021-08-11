require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const auth = require("./middleware/auth");

app.use(express.json());
app.use("/", require("./routes/routes"));

app.get("/welcome", auth, (req, res) => {
  res.status(200).send({
    message: "Welcome to the Restricted Route",
  });
});

module.exports = app;
