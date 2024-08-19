import { WeightHistory } from "@/src/query/hooks/useMe";
import { Fragment } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Svg,
  Text,
} from "react-native-svg";

const GuideLine = ({ y }: { y: number }) => {
  const height = y === 0 ? 30 : y === 200 ? 170 : y;

  return (
    <Line
      x1="0"
      y1={height}
      x2="1000"
      y2={height}
      stroke="lightgray"
      strokeWidth={0.5}
    />
  );
};

const generatePath = (data: WeightHistory[]) => {
  const maxWeight = Math.max(...data.map((item) => item.newWeight));
  const minWeight = Math.min(...data.map((item) => item.newWeight));

  const weightRange = maxWeight - minWeight;

  const x = (index: number) => index * 50 + 30;

  const y = (weight: number) => {
    const percentage = (weight - minWeight) / weightRange;
    const pointY = 200 - percentage * 200;
    return pointY === 0 ? 30 : pointY === 200 ? 170 : pointY;
  };

  return data
    .map((item, index) => {
      return `${index === 0 ? "M" : "L"} ${x(index)} ${y(item.newWeight)}`;
    })
    .join(" ");
};

const generateCirclePoints = (data: WeightHistory[]) => {
  const maxWeight = Math.max(...data.map((item) => item.newWeight));
  const minWeight = Math.min(...data.map((item) => item.newWeight));

  const weightRange = maxWeight - minWeight;

  const x = (index: number) => index * 50 + 30;

  const y = (weight: number) => {
    const percentage = (weight - minWeight) / weightRange;

    const pointY = 200 - percentage * 200;
    return pointY === 0 ? 30 : pointY === 200 ? 170 : pointY;
  };

  return data.map((item, index) => {
    return {
      x: x(index),
      y: y(item.newWeight),
    };
  });
};

const WeightChart = ({ data }: { data: WeightHistory[] }) => {
  const { width, height } = useWindowDimensions();

  const CHART_WIDTH = data.length * 50 < width ? width : data.length * 50;

  return (
    <View className="flex">
      <ScrollView
        horizontal
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Svg width={CHART_WIDTH} height="200">
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#4ade80" stopOpacity="0.2" />
              <Stop offset="1" stopColor="#4ade80" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          {[30, 65, 100, 135, 170].map((_, index) => {
            const y = _;
            return <GuideLine key={index} y={y} />;
          })}
          <Path
            d={generatePath(data)}
            fill="url(#gradient)"
            stroke="#4ade80"
            strokeWidth={4}
          />
          {generateCirclePoints(data).map((point, index) => {
            return (
              <Fragment key={index}>
                <Circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={10}
                  fill="#4ade80"
                  stroke={"white"}
                  strokeWidth={0}
                />
                <Text
                  x={point.x}
                  y={point.y + 1}
                  fill="black"
                  fontSize={10}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontWeight={"bold"}
                >
                  {data[index].newWeight}
                </Text>
              </Fragment>
            );
          })}
        </Svg>
      </ScrollView>
    </View>
  );
};

export default WeightChart;
