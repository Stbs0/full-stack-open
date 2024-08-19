import express from "express";

import calculateBmi, { Obj, Error } from "./bmiCalculator";
import calculateExercises,{Days} from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
    return;
  }
  const result: Obj | Error = calculateBmi(height, weight);
  res.json(result);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const training: any = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (training.daily_exercises === undefined || training.target === undefined) {
    res.json({ error: "parameters missing" });
  }
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof training.daily_exercises !== "object" ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof training.target !== "number"
  ) {
    res.json({ error: "malformatted parameters" });
  }
  const result = calculateExercises(training as Days);

  res.json(result);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
