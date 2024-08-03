import BottomBar from "@/src/components/BottomBar";
import IconButton from "@/src/components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { useColorScheme } from "react-native";

const AuthLayout = () => {
  const darkMode = useColorScheme() === "dark";

  return (
    <Tabs
      tabBar={(props) => <BottomBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: "center",

        headerLeftContainerStyle: {
          paddingLeft: 8,
        },
        headerRightContainerStyle: {
          paddingRight: 8,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Ionicons
              name="home-outline"
              size={18}
              color={darkMode ? "white" : "black"}
            />
          ),
          headerLeft: () => (
            <IconButton
              onPress={() => {
                router.push("mealHistory");
              }}
              icon={
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={darkMode ? "white" : "black"}
                />
              }
            />
          ),

          headerRight: () => (
            <IconButton
              onPress={() => {
                router.push("addMeal");
              }}
              icon={
                <Ionicons
                  name="ellipsis-horizontal-outline"
                  size={24}
                  color={darkMode ? "white" : "black"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(foods)"
        options={{
          title: "Foods",
          tabBarIcon: () => (
            <Ionicons
              name="fast-food-outline"
              size={18}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(achivements)"
        options={{
          title: "Bagdes",
          tabBarIcon: () => (
            <Ionicons
              name="ribbon-outline"
              size={18}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => (
            <Ionicons
              name="person-outline"
              size={18}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
