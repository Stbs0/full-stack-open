import  Radio  from './Radio';
import { useState } from "react";
import { addDiary } from "../services/diariesServices";
import { DiaryEntry, Visibility, Weather } from "../types";
import axios from "axios";

const DiaryForm = (props: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}): JSX.Element => {
  const [comment, setComment] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const newDiary = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment: comment,
    };
    try {
      const addedDiary = await addDiary(newDiary);
      if (axios.isAxiosError(addedDiary)) {
        setErrorMessage(addedDiary.message);
      }
      props.setDiaries([...props.diaries, addedDiary]);

      setComment("");
      setWeather("");
      setVisibility("");
      setDate("");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
        setTimeout(() => setErrorMessage(""), 5000);
      } else if (typeof error === "string") {
        setErrorMessage(error);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };
  return (
    <div>
      <h3>Add new entry</h3>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={onSubmit}>
        <p>Write down what you did today</p>
        <label htmlFor='date'>date</label>
        <input
          type='date'
          id='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />{" "}
        <br />
        <Radio
          setFunc={setWeather}
          radios={["sunny", "cloudy", "rainy"]}
          name='weather'
        />
        <Radio
          setFunc={setVisibility}
          radios={["good", "ok", "bad"]}
          name={"visibility"}
        />
        <br />
       
        <br />
        <label htmlFor='comment'>comment</label>
        <input
          type='text'
          id='comment'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button>Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
