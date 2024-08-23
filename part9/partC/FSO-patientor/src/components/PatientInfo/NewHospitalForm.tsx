import { Input, OutlinedInput, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { SyntheticEvent, useState } from "react";
import { NewHealthEntry, NewHospitalEntry } from "../../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
const NewHospitalForm = ({ notify,diagnosisCodes }: { notify: (message: string) => void ,diagnosisCodes: string[]}) => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [discharge, setDischarge] = useState({
    date: "",
    criteria: "",
  });
  const [codes, setCodes] = useState<string[]>(diagnosisCodes);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewHospitalEntry = {
      description,
      date,
      specialist,
      discharge,
      type: "Hospital",
      diagnosisCodes: codes,
    };
    axios
      .post<NewHealthEntry>(`${apiBaseUrl}/patients/${id}/entries`, newEntry)
      .catch((error) => {
        notify(error.response.data);
      });

    setDescription("");
    setDate("");
    setSpecialist("");
    setDischarge({ date: "", criteria: "" });
    console.log("submitted");
  };const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setCodes(typeof value === "string" ? value.split(",") : value);
  };  console.log('health',diagnosisCodes, codes);
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
        <h2>New Hospital Entry</h2>
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
        />
        <TextField
          id='filled-basic'
          label='Specialist'
          variant='standard'
          value={specialist}
          onChange={(event) => {
            setSpecialist(event.target.value);
          }}
        />
        <h4>Discharge</h4>
        <Stack
          direction='row'
          spacing={2}>
          <TextField
            id='filled-basic'
            label='criteria'
            variant='standard'
            value={discharge.criteria}
            onChange={(event) => {
              setDischarge({ ...discharge, criteria: event.target.value });
            }}
          />
          <Input
            type='date'
            id='filled-basic'
            value={discharge.date}
            onChange={(event) => {
              setDischarge({ ...discharge, date: event.target.value });
            }}
          />
        </Stack>{" "}
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

export default NewHospitalForm;
