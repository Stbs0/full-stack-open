import { parseProcessArgs } from "./parseProcessArgs";

interface Obj {
  height: number;
  weight: number;
  bmi: string;
}
interface Error {
  error: string;
}

const calculateBmi = (height: number, weight: number): Obj | Error => {
  const bmi: number = weight / Math.pow(height / 100, 2);

  if (bmi < 16) {
    return { height, weight, bmi: "Severely underweight" };
  } else if (bmi >= 16 && bmi < 18.5) {
    return { height, weight, bmi: "underweight" };
  } else if (bmi >= 18.5 && bmi < 25) {
    return { height, weight, bmi: "Normal range" };
  } else if (bmi >= 25 && bmi < 30) {
    return { height, weight, bmi: "overweight" };
  } else if (bmi >= 30) {
    return { height, weight, bmi: "obese" };
  }

  return {
    error: "invalid BMI",
  };
};
const [value1, value2]: number[] = parseProcessArgs(process.argv);
console.log(calculateBmi(value1, value2));
