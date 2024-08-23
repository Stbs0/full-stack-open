import { Diagnosis, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
import EntryDetails from "../../utilis";
import diagnosisServices from "../../services/diagnosisServices";
import NewHealthCheckForm from "./NewHealthCheckForm";
import Alert from "@mui/material/Alert";
import NewHospitalForm from "./NewHospitalForm";
import NewOccupationalHealthcareForm from "./NewOccupationHealthcareForm";

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);
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
  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };
  return (
    <div>
      <div>
        <div>
          <strong>Name</strong>: {patient.name}{" "}
          {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
          <br />
          <strong>Ssn</strong>: {patient.ssn}
          <br />
          <strong>Gender</strong>: {patient.gender}
          <br />
          <strong>Date</strong> of Birth: {patient.dateOfBirth}
          <br />
          <strong>Occupation</strong>: {patient.occupation}
        </div>
      </div>
      {error && (
        <Alert
          variant='filled'
          severity='error'>
          {error}
        </Alert>
      )}
      <NewHealthCheckForm
        notify={notify}
        diagnosisCodes={diagnoses.map((d) => d.code)}
      />
      <NewHospitalForm
        notify={notify}
        diagnosisCodes={diagnoses.map((d) => d.code)}
      />
      <NewOccupationalHealthcareForm
        notify={notify}
        diagnosisCodes={diagnoses.map((d) => d.code)}
      />
      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <div key={entry.id}>{EntryDetails(entry)}</div>
      ))}
    </div>
  );
};

export default PatientInfo;
