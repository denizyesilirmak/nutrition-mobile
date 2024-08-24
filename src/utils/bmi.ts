// - Underweight: < 18.5
// - Normal: 18.5–24.9
// - Overweight: 25.0–29.9
// - Obesity Class I: 30.0–34.9
// - Obesity Class II: 35.0–39.9
// - Extreme Obesity: 40.0+

const getBmiCategory = (bmi: number) => {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight";
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return "Obesity Class I";
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return "Obesity Class II";
  } else {
    return "Extreme Obesity";
  }
};

const calculateBMI = ({ weight, height }: User) => {
  if (!weight || !height) {
    return "N/A";
  }

  return (weight / (height / 100) ** 2).toFixed(2);
};

export { getBmiCategory, calculateBMI };
