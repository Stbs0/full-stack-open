import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry } from "../../types";
const HospitalEntries = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={{ border: "1px solid black" }}>
      <p>
        <strong>
          {entry.date} <LocalHospitalIcon />
          <br />
          <em>{entry.description} </em>
          <br />{" "}
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((a) => <li>{a}</li>)}
          Discharge: {entry.discharge.date} by {entry.discharge.criteria}
        </strong>
      </p>
    </div>
  );
};

export default HospitalEntries;
