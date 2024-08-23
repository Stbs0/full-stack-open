import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry } from "../../types";
const HospitalEntries = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        {entry.date} <LocalHospitalIcon />
        <strong>
          <br />
          <em>{entry.description} </em>
          <br />{" "}
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((a) => <li key={a}>{a}</li>)}
          Discharge: {entry.discharge.date} by {entry.discharge.criteria}
        </strong>
      </div>
    </div>
  );
};

export default HospitalEntries;
