import { Text, View } from "react-native";
import ProgressCircular from "../ProgressCircular";
import ProgressLine from "../ProgressLine";

const DUMMY_DATA = {
  eaten: 1800,
  burned: 600,
  target: 1850,
  carbs: {
    current: 300,
    target: 560,
  },
  protein: {
    current: 200,
    target: 300,
  },
  fat: {
    current: 123,
    target: 300,
  },
  tard: {
    current: 280,
    target: 300,
  },
  horseshit: {
    current: 50,
    target: 300,
  },
  tomato: {
    current: 250,
    target: 300,
  },
};

const Dashboard = () => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="flex-coll w-full items-center justify-around rounded-3xl bg-white p-4 shadow-md">
        <View className="flex-1 flex-row items-center justify-center">
          <View className="flex-1 flex-col items-center justify-center">
            <Text className="text-xl">{DUMMY_DATA.eaten}</Text>
            <Text className="text-sm color-slate-600">Eaten</Text>
          </View>
          <ProgressCircular progress={0.2} target={1850} />
          <View className="flex-1 flex-col items-center justify-center">
            <Text className="text-xl">{DUMMY_DATA.burned}</Text>
            <Text className="text-sm color-slate-600">Burned</Text>
          </View>
        </View>
        <View className="flex-1 flex-row p-2">
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Carbs</Text>
            <ProgressLine
              progress={DUMMY_DATA.carbs.current / DUMMY_DATA.carbs.target}
            />
            <Text className="text-sm">
              {DUMMY_DATA.carbs.current}/{DUMMY_DATA.carbs.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Protein</Text>
            <ProgressLine
              progress={DUMMY_DATA.protein.current / DUMMY_DATA.protein.target}
            />
            <Text className="text-sm">
              {DUMMY_DATA.protein.current}/{DUMMY_DATA.protein.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Fat</Text>
            <ProgressLine
              progress={DUMMY_DATA.fat.current / DUMMY_DATA.fat.target}
            />
            <Text className="text-sm">
              {DUMMY_DATA.fat.current}/{DUMMY_DATA.fat.target} gr
            </Text>
          </View>
        </View>

        <View className="flex-1 flex-row p-1">
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Tard</Text>
            <ProgressLine
              progress={DUMMY_DATA.tard.current / DUMMY_DATA.tard.target}
            />
            <Text className="text-sm">
              {DUMMY_DATA.tard.current}/{DUMMY_DATA.tard.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Horseshit</Text>
            <ProgressLine
              progress={
                DUMMY_DATA.horseshit.current / DUMMY_DATA.horseshit.target
              }
            />
            <Text className="text-sm">
              {DUMMY_DATA.horseshit.current}/{DUMMY_DATA.horseshit.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Tomato</Text>
            <ProgressLine
              progress={DUMMY_DATA.tomato.current / DUMMY_DATA.tomato.target}
            />
            <Text className="text-sm">
              {DUMMY_DATA.tomato.current}/{DUMMY_DATA.tomato.target} gr
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
