import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";

const AuthLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: () => <Ionicons name="home-outline" size={28} />,
        }}
      />
      <Tabs.Screen
        name="(foods)"
        options={{
          headerTitle: "Foods",
          tabBarIcon: () => <Ionicons name="fast-food-outline" size={28} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: () => <Ionicons name="person-outline" size={28} />,
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
