import Login from "../screens/login";
import Onboarding from "../screens/onboarding";
import Storage from "../storage";

const HomeScreen = () => {
  const onboardingCompleted = Storage.getItem("ONBOARDING_COMPLETED");

  if (onboardingCompleted) {
    return <Login />;
  }

  return <Onboarding />;
};

export default HomeScreen;
