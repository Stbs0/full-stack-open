import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
const OccupationEntries = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div style={{ border: "1px solid black" }}>
      <p>
        <strong>
          {entry.date} <WorkIcon />
          <br />
          <em>{entry.description} </em>
          <br />
          {entry.employerName}
          <br />
          sick leave {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}{" "}
          <br />
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((a) => <li>{a}</li>)}
        </strong>
      </p>
    </div>
  );
};

export default OccupationEntries;
