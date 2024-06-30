import { Text, View } from "react-native";
import ProgressCircular from "../ProgressCircular";
import ProgressLine from "../ProgressLine";

export type DashboardProps = {
  data: {
    eaten: number;
    burned: number;
    target: number;
    carbs: {
      current: number;
      target: number;
    };
    protein: {
      current: number;
      target: number;
    };
    fat: {
      current: number;
      target: number;
    };
    tard: {
      current: number;
      target: number;
    };
    horseshit: {
      current: number;
      target: number;
    };
    tomato: {
      current: number;
      target: number;
    };
  };
};

const Dashboard = ({ data }: DashboardProps) => {
  console.log("eatendata", data.eaten);

  return (
    <View className="flex-1 items-center justify-center px-6">
      <View
        className="flex-coll w-full items-center justify-around rounded-3xl bg-white p-4"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <View className="flex-1 flex-row items-center justify-center">
          <View className="flex-1 flex-col items-center justify-center">
            <Text className="text-xl">{data.eaten}</Text>
            <Text className="text-sm color-slate-600">Eaten</Text>
          </View>
          <ProgressCircular progress={data.eaten / 1850} target={1850} />
          <View className="flex-1 flex-col items-center justify-center">
            <Text className="text-xl">{data.burned}</Text>
            <Text className="text-sm color-slate-600">Burned</Text>
          </View>
        </View>
        <View className="flex-1 flex-row p-2">
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Carbs</Text>
            <ProgressLine
              progress={data.carbs.current / data.carbs.target}
              index={1}
            />
            <Text className="text-sm">
              {data.carbs.current}/{data.carbs.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Protein</Text>
            <ProgressLine
              progress={data.protein.current / data.protein.target}
              index={2}
            />
            <Text className="text-sm">
              {data.protein.current}/{data.protein.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Fat</Text>
            <ProgressLine
              progress={data.fat.current / data.fat.target}
              index={3}
            />
            <Text className="text-sm">
              {data.fat.current}/{data.fat.target} gr
            </Text>
          </View>
        </View>

        <View className="flex-1 flex-row p-1">
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Tard</Text>
            <ProgressLine
              progress={data.tard.current / data.tard.target}
              index={4}
            />
            <Text className="text-sm">
              {data.tard.current}/{data.tard.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Horseshit</Text>
            <ProgressLine progress={data.horseshit.current / data.horseshit.target} index={5} />
            <Text className="text-sm">
              {data.horseshit.current}/{data.horseshit.target} gr
            </Text>
          </View>
          <View className="flex-1 flex-col items-center justify-center p-2">
            <Text className="p-2 text-sm color-slate-600">Tomato</Text>
            <ProgressLine
              progress={data.tomato.current / data.tomato.target}
              index={6}
            />
            <Text className="text-sm">
              {data.tomato.current}/{data.tomato.target} gr
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
