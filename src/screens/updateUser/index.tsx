import Button from "@/src/components/Button";
import ScreenView from "@/src/components/ScreenView";
import TextInput from "@/src/components/TextInput";
import useMe, { User } from "@/src/query/hooks/useMe";
import { useState } from "react";
import { Text, View } from "react-native";

const UpdateUser = () => {
  const { me, updateMe } = useMe();
  const [user, setUser] = useState<User>(me as User);

  const handleUpdate = () => {
    console.log("handleUpdate");
    updateMe(user);
  };

  return (
    <ScreenView padding>
      <View className="gap-4">
        <View className="gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <Text className="text-lg font-bold">Update User</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            To keep your weight history, please update your information.
          </Text>
        </View>
        <View className="gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <TextInput
            placeholder="Name"
            value={user?.firstName}
            onChangeText={(text) => setUser({ ...user, firstName: text })}
          />
          <TextInput
            placeholder="Last Name"
            value={user?.lastName}
            onChangeText={(text) => setUser({ ...user, lastName: text })}
          />
          <TextInput
            placeholder="Email"
            value={user?.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <TextInput
            placeholder="Weight"
            value={`${user?.weight}`}
            postFix="kg"
            onChangeText={(text) => setUser({ ...user, weight: Number(text) })}
          />
          <TextInput
            placeholder="Height"
            value={`${user?.height}`}
            postFix="cm"
            onChangeText={(text) => setUser({ ...user, height: Number(text) })}
          />
          <Button label="Update" onPress={handleUpdate} />
        </View>
      </View>
    </ScreenView>
  );
};

export default UpdateUser;
