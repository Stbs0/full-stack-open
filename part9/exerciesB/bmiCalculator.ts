const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);
  if (bmi < 16) {
    return "Severely underweight";
  } else if (bmi >= 16 && bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30) {
    return "Obese";
  }

  return "Invalid BMI";
};

console.log(calculateBmi(180, 74));
