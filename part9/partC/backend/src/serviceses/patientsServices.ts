import { NewPatient, NoSsn, Patient } from "../types";
import patients from "../../data/patients";

import { v1 as uuid } from "uuid";
const getPatients = (): NoSsn[] => {
  return patients;
};

const addPatient = (obj: NewPatient): Patient => {
  const newPatient = {...obj, id: uuid()};

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
