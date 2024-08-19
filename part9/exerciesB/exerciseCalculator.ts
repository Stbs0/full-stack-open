import { parseProcessArgs } from "./parseProcessArgs";

export interface Obj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export interface Days {
  daily_exercises: number[];
  target: number;
}

const calculateExercises = (days: Days): Obj => {
  const periodLength: number = days.daily_exercises.length;

  const trainingDays: number = days.daily_exercises.reduce(
    (a, b) => (b === 0 ? a : ++a),
    0,
  );

  const average: number =
    days.daily_exercises.reduce((a, b) => a + b, 0) /
    days.daily_exercises.length;

  const rating: 1 | 2 | 3 =
    days.target > average ? 3 : days.target === average ? 2 : 1;

  const ratingDescription: string =
    rating === 1 ? "bad" : rating === 2 ? "ok" : "good";
  const success: boolean = average >= days.target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: days.target,
    average,
  };
};
if (require.main === module) {
  const [target, ...args]: number[] = parseProcessArgs(process.argv);

  console.log(calculateExercises({ daily_exercises: args, target }));
}
export default calculateExercises;
