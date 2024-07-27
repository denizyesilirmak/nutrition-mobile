import { Text, View } from "react-native";

type StepperProps = {
  steps: string[];
  activeStep: number;
};

const Dot = ({ stepName, active }: { stepName: string; active?: boolean }) => {
  return (
    <View
      className={`flex-row items-center justify-center rounded-full px-4 py-1 transition-all ease-in-out duration-500 ${
        active
          ? "z-10 scale-110 bg-lime-500 dark:bg-green-500"
          : "scale-100 bg-gray-300"
      }`}
    >
      <Text className="text-xs text-white dark:text-black">{stepName}</Text>
    </View>
  );
};

const Line = () => {
  return <View className="h-1 w-8 bg-gray-300"></View>;
};

const Stepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <View className="h-12 w-full flex-row items-center justify-center px-8">
      {steps.map((step, index) => (
        <View className="flex-row items-center" key={index}>
          <Dot stepName={step} active={index === activeStep} />
          {index !== steps.length - 1 && <Line />}
        </View>
      ))}
    </View>
  );
};

export default Stepper;
