import { NewPatient, NonSensitivePatient, Patient } from "../types";
import patients from "../../data/patients";

import { v1 as uuid } from "uuid";
const getPatients = (): NonSensitivePatient[] => {
  return patients;
};

const addPatient = (obj: NewPatient): Patient => {
  const newPatient = { ...obj, id: uuid() };

  patients.push(newPatient);
  return newPatient;
};

const getOnePatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};



export default { getPatients, addPatient, getOnePatient };
