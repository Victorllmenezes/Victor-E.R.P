const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const entitiesRoute = require("./routes/entitiesRoute");
const productsRoute = require("./routes/productsRoute");
const usersRoute = require("./routes/usersRoute");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json()); // Apenas entrada no formato JSON

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/entities", entitiesRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);

app.use((req, res, next) => {
  const error = new Error("Bad Request");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: error.status,
    message: error.message,
  });
});

module.exports = app;
