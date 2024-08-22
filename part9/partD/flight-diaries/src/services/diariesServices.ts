import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(
    "http://localhost:3000/api/diaries",
  );
  return response.data;
};

export const addDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(
    "http://localhost:3000/api/diaries",
    newDiary,
  );
  return response.data;
};
