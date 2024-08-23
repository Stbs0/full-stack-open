import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { SyntheticEvent, useState } from "react";
import { NewHealthEntry, NewOccupationalEntry } from "../../types";
import { Input, OutlinedInput, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
const NewOccupationalHealthcareForm = ({
  notify,
  diagnosisCodes,
}: {
  notify: (message: string) => void;
  diagnosisCodes: string[];
}) => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState({
    startDate: "",
    endDate: "",
  });
  const [codes, setCodes] = useState<string[]>(diagnosisCodes);
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewOccupationalEntry = {
      description,
      date,
      specialist,
      employerName,
      type: "OccupationalHealthcare",
      diagnosisCodes: codes,
      sickLeave,
    };
    axios
      .post<NewHealthEntry>(`${apiBaseUrl}/patients/${id}/entries`, newEntry)
      .catch((error) => {
        notify(error.response.data);
      });

    setDescription("");
    setDate("");
    setSpecialist("");
    setEmployerName("");
    setSickLeave({ startDate: "", endDate: "" });

    console.log("submitted");
  };
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setCodes(typeof value === "string" ? value.split(",") : value);
  };
  console.log("occ", diagnosisCodes, codes);

  return (
    <form
      onSubmit={onSubmit}
      action=''
      style={{
        border: "3px dotted black",
        padding: "10px",
      }}>
      <Stack
        direction='column'
        spacing={2}>
        <h2>New Occupational Healthcare Entry</h2>
        <TextField
          id='filled-basic'
          label='Description'
          variant='standard'
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <Input
          type='date'
          id='filled-basic'
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />{" "}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id='demo-multiple-name-label'>Diagnosis Codes</InputLabel>
          <Select
            labelId='demo-multiple-name-label'
            id='demo-multiple-name'
            multiple
            value={codes} // use codes here, which is an array of strings
            onChange={handleChange}
            input={<OutlinedInput label='Diagnosis Codes' />}>
            {diagnosisCodes.map((code) => (
              <MenuItem
                key={code}
                value={code} // ensure this is the string value
              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id='filled-basic'
          label='Specialist'
          variant='standard'
          value={specialist}
          onChange={(event) => {
            setSpecialist(event.target.value);
          }}
        />
        <TextField
          id='filled-basic'
          label='Employer Name'
          variant='standard'
          value={employerName}
          onChange={(event) => {
            setEmployerName(event.target.value);
          }}
        />
        <h4>Sick Leave</h4>
        <Stack
          direction='row'
          spacing={2}>
          <Input
            type='date'
            id='filled-basic'
            value={sickLeave.startDate}
            onChange={(event) => {
              setSickLeave({ ...sickLeave, startDate: event.target.value });
            }}
          />
          <Input
            type='date'
            id='filled-basic'
            value={sickLeave.endDate}
            onChange={(event) => {
              setSickLeave({ ...sickLeave, endDate: event.target.value });
            }}
          />
        </Stack>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-end'
          spacing={2}>
          <Button
            variant='contained'
            onClick={() => window.history.back()}
            color='error'>
            Cancel
          </Button>
          <Button
            variant='contained'
            type='submit'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default NewOccupationalHealthcareForm;
