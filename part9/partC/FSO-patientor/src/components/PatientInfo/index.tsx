import { Diagnosis, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
import EntryDetails from "../../utilis";
import diagnosisServices from "../../services/diagnosisServices";
const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios.get(apiBaseUrl + "/patients/" + id).then((response) => {
      setPatient(response.data);
      diagnosisServices.getAllDiagnosis().then((diagnoses) => {
        setDiagnoses(diagnoses);
      });
      setDiagnoses(diagnoses);
    });
  }, [id]);
  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>
        Name: {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        <br />
        Ssn: {patient.ssn}
        <br />
        Gender: {patient.gender}
        <br />
        Date of Birth: {patient.dateOfBirth}
        <br />
        Occupation: {patient.occupation}
      </p>

      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <p key={entry.id}>{EntryDetails(entry)}</p>
      ))}
    </div>
  );
};

export default PatientInfo;
