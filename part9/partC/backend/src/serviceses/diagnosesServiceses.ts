import data from "../../data/diagnoses";
import { Diagnoses } from "../types";
 const getDiagnoses = () :Diagnoses[]=> {
  return data;
};

export default { getDiagnoses };
