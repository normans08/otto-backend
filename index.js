const express = require("express");
const routes = require("./src/routers/router");
const cors = require("cors");
const app = express();

app.use(express.json());
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,X-CSRF-Token",
    preflightContinue: false,
    credentials: false,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

// simple route
app.use(routes);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
