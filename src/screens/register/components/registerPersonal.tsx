import LargeSwitch from "@/src/components/LargeSwitch";
import TextInput from "@/src/components/TextInput";
import { Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

type RegisterPersonalProps = {
  name: string;
  lastName: string;
  age: string;
  weight: number;
  height: number;
  gender: string;
  onChangeName: (name: string) => void;
  onChangeLastName: (lastName: string) => void;
  onAgeChange: (age: string) => void;
  onChangeWeight: (weight: number) => void;
  onChangeHeight: (height: number) => void;
  onChangeGender: (gender: string) => void;
};

const RegisterPersonal = ({
  name,
  lastName,
  age,
  weight,
  height,
  gender,
  onChangeGender,
  onChangeHeight,
  onChangeLastName,
  onAgeChange,
  onChangeName,
  onChangeWeight,
}: RegisterPersonalProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View className="flex-1 items-center gap-4">
      <Text className="text-2xl font-bold dark:color-white">
        Let's get to know you better! 🙏
      </Text>
      <Text className="text-sm dark:text-gray-300">
        We need some information to provide you with the best experience.
      </Text>
      <TextInput
        icon="person"
        placeholder="Name"
        autoCapitalize="words"
        keyboardType="default"
        value={name}
        onChangeText={onChangeName}
      />
      <TextInput
        icon="person"
        placeholder="Last Name"
        autoCapitalize="words"
        keyboardType="default"
        value={lastName}
        onChangeText={onChangeLastName}
      />
      <TextInput
        icon="person"
        placeholder="Birth Date"
        autoCapitalize="none"
        keyboardType="numeric"
        postFix=""
        value={age.toString()}
        onChangeText={onAgeChange}
      />
      <TextInput
        icon="monitor-weight"
        placeholder="Weight"
        autoCapitalize="none"
        keyboardType="numeric"
        postFix="kg"
        value={weight.toString()}
        onChangeText={(value) => onChangeWeight(Number(value))}
      />
      <TextInput
        icon="emoji-people"
        placeholder="Height"
        autoCapitalize="none"
        keyboardType="numeric"
        postFix="cm"
        value={height.toString()}
        onChangeText={(value) => onChangeHeight(Number(value))}
      />
      <LargeSwitch
        options={[
          {
            text: "👨 Male",
            value: "male",
          },
          {
            text: "👩‍🦳 Female",
            value: "female",
          },
        ]}
        onChange={onChangeGender}
        selectedValue={gender}
      />
    </View>
  );
};

export default RegisterPersonal;
