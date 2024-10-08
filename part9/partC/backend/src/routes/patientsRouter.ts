import express from "express";
import patientsServices from "../serviceses/patientsServices";
import toNewPatient, { toNewEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsServices.getPatients());
});
router.get("/:id", (req, res) => {
  try {
    const patients = patientsServices.getOnePatient(req.params.id);
    res.json(patients);
  } catch (error) {
    if (error instanceof Error) {
      res.json(error.message);
    }
  }
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsServices.addPatient(newPatient);
  if (!addedPatient) {
    res.status(400).send("malformatted parameters");
  }

  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    if (!newEntry) {
      return res.status(400).send("malformatted parameters");
    }
    const patient = patientsServices.getOnePatient(req.params.id);
    if (!patient) {
      return res.status(400).send("malformatted parameters");
    }
    const addedEntry = patientsServices.addedEntry(patient, newEntry);
    if (!addedEntry) {
      return res.status(400).send("malformatted parameters");
    }
    return res.json(addedEntry);
  } catch (error) {
    console.log("ddddddddddd", error);
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    return res.status(400).json(error);
  }
});
export default router;
