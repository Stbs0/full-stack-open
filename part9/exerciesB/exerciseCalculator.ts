interface Obj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: number[], target: number): Obj => {
  const periodLength: number = days.length;
  const trainingDays: number = days.reduce((a, b) => (b === 0 ? ++a : a), 0);
  const average: number = days.reduce((a, b) => a + b, 0) / days.length;
  const rating: 1 | 2 | 3 = target;
  //   const success:string=
  return {};
};
