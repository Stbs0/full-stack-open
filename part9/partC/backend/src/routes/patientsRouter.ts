import express from "express";
import patientsServices from "../serviceses/patientsServices";
import toNewPatient from "../utils";
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
export default router;
