import Button from "@/src/components/Button";
import ScreenView from "@/src/components/ScreenView";
import Stepper from "@/src/components/Stepper";
import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import PagerView from "react-native-pager-view";
import RegisterBasic from "./components/registerBasic";
import RegisterPersonal from "./components/registerPersonal";
import { PasswordErrors } from "./types";
import RegisterReview from "./components/registerReview";
import RegisterSuccess from "./components/registerSuccess";
import useRegister from "@/src/query/hooks/useRegister";

const Register = () => {
  const pagerRef = useRef<PagerView>(null);

  const [email, setEmail] = useState<string>("dnzyslrmk@gmail.com");
  const [password, setPassword] = useState<string>("Password123");
  const [passwordVerify, setPasswordVerify] = useState<string>("Password123");
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
    length: "default",
    uppercase: "default",
    lowercase: "default",
    match: "default",
    validEmail: "default",
  });
  const [name, setName] = useState<string>("Deniz");
  const [lastName, setLastName] = useState<string>("Yeşilırmak");
  const [age, setAge] = useState<string>("1995-04-20");
  const [weight, setWeight] = useState<number>(77);
  const [height, setHeight] = useState<number>(180);
  const [gender, setGender] = useState<string>("male");

  const [activeStep, setActiveStep] = useState<number>(0);
  const scrollEnabledRef = useRef<boolean>(true);

  const { register, isError, isPending, isSuccess, error } = useRegister({
    email,
    password,
    birthDate: age,
    height,
    weight,
  });

  useEffect(() => {
    // error && Alert.alert("Error", error.message);
    if (error) {
      Alert.alert("Error", error.message);
      pagerRef.current?.setPage(0);
      setActiveStep(0);
    }

    if (isSuccess) {
      pagerRef.current?.setPage(3);
      setActiveStep(3);
    }
  }, [error, isSuccess]);

  useEffect(() => {
    //set the error states but don't run on the first render
    if (password.length > 0) {
      setPasswordErrors((prev) => ({
        ...prev,
        length: password.length >= 8 ? "satisfied" : "error",
        uppercase: /[A-Z]/.test(password) ? "satisfied" : "error",
        lowercase: /[a-z]/.test(password) ? "satisfied" : "error",
        match: password === passwordVerify ? "satisfied" : "error",
      }));
    }
    if (email.length > 0) {
      setPasswordErrors((prev) => ({
        ...prev,
        validEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "satisfied"
          : "error",
      }));
    }
  }, [password, passwordVerify, email]);

  const handleRegisterButtonPress = () => {
    //Gather register data and send it to the server
    const birthDate = new Date().toISOString();

    register();
  };

  return (
    <ScreenView scrollable={false} padding>
      <PagerView
        ref={pagerRef}
        initialPage={0}
        style={{ flex: 1 }}
        onPageSelected={(e) => setActiveStep(e.nativeEvent.position)}
        scrollEnabled={scrollEnabledRef.current}
      >
        <View key={0}>
          <RegisterBasic
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordVerify={passwordVerify}
            setPasswordVerify={setPasswordVerify}
            passwordErrors={passwordErrors}
            setPasswordErrors={setPasswordErrors}
          />
        </View>
        <View key={1}>
          <RegisterPersonal
            name={name}
            lastName={lastName}
            age={age}
            weight={weight}
            height={height}
            gender={gender}
            onChangeName={setName}
            onChangeLastName={setLastName}
            onAgeChange={setAge}
            onChangeWeight={setWeight}
            onChangeHeight={setHeight}
            onChangeGender={setGender}
          />
        </View>
        <View key={2}>
          <RegisterReview name={name} lastName={lastName} />
        </View>
        <View key={3}>
          <RegisterSuccess />
        </View>
      </PagerView>
      {activeStep < 3 && (
        <>
          <Stepper
            steps={["Account", "Personal", "Review"]}
            activeStep={activeStep}
          />
          <Button
            label={activeStep === 2 ? "Register" : "Next"}
            disabled={
              passwordErrors.length !== "satisfied" ||
              passwordErrors.uppercase !== "satisfied" ||
              passwordErrors.lowercase !== "satisfied" ||
              passwordErrors.match !== "satisfied" ||
              passwordErrors.validEmail !== "satisfied"
            }
            onPress={() => {
              if (activeStep < 2) {
                pagerRef.current?.setPage(activeStep + 1);
                setActiveStep(activeStep + 1);
              } else {
                handleRegisterButtonPress();
              }
            }}
          />
        </>
      )}
    </ScreenView>
  );
};

export default Register;
