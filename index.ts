import express from "express";
import cors from "cors";

import {
  registerService,
  unregisterService,
  getService,
  getProposers,
  getAcceptors,
  getLearners,
  getServices,
  updateService,
} from "./api/registry.service";
import { Service, ServiceType } from "./model/service";

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
  const { id, uri, role } = req.body;

  const service = new Service(id, uri, role, "UP");

  registerService(service, () => {
    res.status(200).json({ response: "Service is registered." });
  });
});

app.get("/get-services", (req, res) => {
  getServices((services) => {
    res.status(200).json({ response: services });
  });
});

app.get("/get-service/:id", (req, res) => {
  const { id } = req.params;

  getService(id, (service: ServiceType) => {
    if (typeof service !== "undefined")
      res.status(200).json({ response: service });
    else res.status(200).json({ response: "Service is not found." });
  });
});

app.get("/get-proposers/", (req, res) => {
  getProposers((proposers: ServiceType[]) => {
    if (proposers.length == 0) res.status(200).json({ response: proposers });
    else res.status(200).json({ response: "Service is not found." });
  });
});

app.get("/get-acceptors/", (req, res) => {
  getAcceptors((acceptors: ServiceType[]) => {
    if (acceptors.length == 0) res.status(200).json({ response: acceptors });
    else res.status(200).json({ response: "Service is not found." });
  });
});

app.get("/get-learners/", (req, res) => {
  getLearners((learners: ServiceType[]) => {
    if (learners.length == 0) res.status(200).json({ response: learners });
    else res.status(200).json({ response: "Service is not found." });
  });
});

app.delete("/unergister-service", (req, res) => {
  const { name } = req.body;

  unregisterService(name, () => {
    res.status(200).json({ response: "Service is un-registered." });
  });
});

app.put("/mark-node-as-master", (req, res) => {
  const { id, uri, role } = req.body;

  const service = new Service(id, uri, role, "UP");

  updateService(service, () => {
    res.status(200).json({ response: "Master Updated." });
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: {
      message: "Not found.",
    },
  });
});

app.listen(PORT, () => {
  console.log(`API listening on: ${PORT} `);
});
