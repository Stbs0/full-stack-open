import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diariesServices";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([
   
  ]);
  useEffect(() => {
    getAllDiaries().then((res) => setDiaries(res));
  }, []);
  console.log(diaries);
  return (
    <>
    <DiaryForm setDiaries={setDiaries} diaries={diaries} />
      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </>
  );
}
export default App;
