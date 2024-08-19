import { parseProcessArgs } from "./parseProcessArgs";

interface Obj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const [target,...args]: number[] = parseProcessArgs(process.argv);

const calculateExercises = (days: number[], target: number): Obj => {
  const periodLength: number = days.length;
  const trainingDays: number = days.reduce((a, b) => (b === 0 ? a : ++a), 0);
  const average: number = days.reduce((a, b) => a + b, 0) / days.length;
  const rating: 1 | 2 | 3 = target > average ? 3 : target === average ? 2 : 1;
  const ratingDescription: string =
    rating === 1 ? "bad" : rating === 2 ? "ok" : "good";
  const success: boolean = average >= target;

  return {
    target,
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    average,
  };
};

console.log(calculateExercises(args, target));
