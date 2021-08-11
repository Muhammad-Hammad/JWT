const express = require("express");
const app = require("./app");

const port = process.env.PORT || 5000;

const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => console.log("app running on : ", port));
