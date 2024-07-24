const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const routeHandler = require("./routes");

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api/v1", routeHandler);

app.use((req, res, next) => {
  const error = new Error("app.use error");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;