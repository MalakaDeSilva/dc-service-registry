const express = require("express");
const cors = require("cors");

const {
  registerService,
  unregisterService,
  getService,
} = require("./api/registry.service");

const app = express();

const PORT = 8000 || process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/register-service", (req, res) => {
  const { name, uri } = req.body;

  registerService(name, uri, () => {
    res.status(200).json({ response: "Service is registered." });
  });
});

app.get("/get-service/:name", (req, res) => {
  const { name } = req.params;

  getService(name, (service) => {
    res.redirect(service);
  });
});

app.delete("/unergister-service", (req, res) => {
  const { name } = req.body;

  unregisterService(name, () => {
    res.status(200).json({ response: "Service is un-registered." });
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`API listening on: ${PORT} `);
});
