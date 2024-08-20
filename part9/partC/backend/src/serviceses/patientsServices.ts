import { NoSsn } from "../types";
import data from "../../data/patients";
const getPatients = (): NoSsn[] => {
  return data;
};

export default { getPatients };
