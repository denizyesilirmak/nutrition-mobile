import ScreenView from "@/src/components/ScreenView";
import Stepper from "@/src/components/Stepper";
import { Image, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

import Button from "@/src/components/Button";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ONBOARDING_SLIDES } from "./constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Storage from "@/src/storage";

const SliderItem = ({
  title,
  image,
  description,
  subtitle,
  hasButton,
}: {
  title: string;
  image: any;
  description: string;
  subtitle?: string;
  hasButton?: boolean;
}) => {
  return (
    <>
      <View className="flex-1 items-center gap-4">
        <Text className="text-2xl font-bold dark:text-gray-300">{title}</Text>
        <Image source={image} className="flex-1" resizeMode="contain" />
        <Text className="text-md font-semibold dark:text-gray-300">
          {subtitle}
        </Text>
        <Text className="text-md text-center dark:text-gray-300">
          {description}
        </Text>
      </View>
      {hasButton && (
        <>
          <Button
            label="Create an Account"
            onPress={() => {
              router.push("register");
            }}
          />
          <Button
            label="Login"
            onPress={() => {
              router.push("login");
            }}
          />
        </>
      )}
    </>
  );
};

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (activeStep === ONBOARDING_SLIDES.length - 1) {
      Storage.setItem("ONBOARDING_COMPLETED", "true");
    }
  }, [activeStep]);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <ScreenView scrollable={false} padding>
        <PagerView
          initialPage={0}
          style={{ flex: 1 }}
          onPageSelected={(e) => setActiveStep(e.nativeEvent.position)}
        >
          {ONBOARDING_SLIDES.map((slide, index) => (
            <View
              key={index}
              className="flex-1 items-center justify-center gap-4 pb-4"
            >
              <SliderItem {...slide} />
            </View>
          ))}
        </PagerView>
        <Stepper
          steps={ONBOARDING_SLIDES.map((_, index) => (index + 1).toString())}
          activeStep={activeStep}
        />
      </ScreenView>
    </SafeAreaView>
  );
};

export default Onboarding;
