import HealthCheckEntries from "./components/PatientInfo/HealthCheckesEntries";
import HospitalEntries from "./components/PatientInfo/HospitalEntry";
import OccupationEntries from "./components/PatientInfo/OcupationEntries";
import {
  Entry,
  // HealthCheckEntry,
  // HospitalEntry,
  // OccupationalHealthcareEntry,
} from "./types";

const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntries entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationEntries entry={entry} />;
    case "Hospital":
      return <HospitalEntries entry={entry} />;
  }
};

// const getDiagnosisName = (code: string) => {
//     const diagnosis = diagnoses.find((d) => d.code === code);
//     if (!diagnosis) {
//       return;
//     }
//     return diagnosis.name;
//   };

export default EntryDetails;
