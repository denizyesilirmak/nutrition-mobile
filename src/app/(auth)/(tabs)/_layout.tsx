import Header from "@/src/components/Header";
import IconButton from "@/src/components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";

const AuthLayout = () => {
  return (
    <Tabs
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
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: () => <Ionicons name="home-outline" size={28} />,
          headerLeft: () => (
            <IconButton icon={<Ionicons name="calendar-outline" size={24} />} />
          ),

          headerRight: () => (
            <IconButton
              icon={<Ionicons name="ellipsis-horizontal-outline" size={24} />}
            />
          ),
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
